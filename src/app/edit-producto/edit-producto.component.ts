import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent {
  percentage = 0;
  url_img: string = '';
  id!: string;

  producto: any = {}; 

  constructor(private firebaseService: FirebaseService,
    private activateRoute: ActivatedRoute,
    private storage: Storage){
      
  }

  subirArchivo($event: any){
    const file = $event.target.files[0];

    const imgRef = ref(this.storage, `images/${file.name}`)

    uploadBytes(imgRef, file)
    .then(x => {console.log(x)})
    .catch(err => {console.error(err)})
  }

 getColegio(id: string){
    this.firebaseService.getColegioPorId(id)
    .subscribe(colegio => {
      this.producto.colegio = colegio
      console.log(colegio);
    }
      
    )
  }
  getProducto(id: string){
    this.firebaseService.getProductoPorId(id).subscribe( data => {
      this.producto = data; 
    })
  }

  onSubmit(){
    this.firebaseService.addProducto(this.producto)
      .then()
      .catch(error => console.error('Error agregando:', error));
  }  

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params =>{
      this.id = params['id'];
      this.getProducto(this.id);
    })
  }

  editarProducto(){
    this.firebaseService.updateProducto(this.id, this.producto)
  }
}
