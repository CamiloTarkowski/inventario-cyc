import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { error } from 'console';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent {

  percentage = 0;
  url_img: string = '';

  

  producto = {
    nombre: '',
    descripcion: '',
    colegio: {
      nombre: '',
      fullname: '',
      id: ''
    },
    tallas: [{
      id: 0,
      n_talla: '6',
      precio: 0,
      cantidad: 0
    },
    {
      id: 1,
      n_talla: '8',
      precio:0,
      cantidad: 0
    },
    {
      id: 2,
      n_talla: '10',
      precio: 0,
      cantidad: 0
    },
    {
      id: 3,
      n_talla: '12',
      precio: 0,
      cantidad: 0
    },
    {
      id: 4,
      n_talla: '14',
      precio: 0,
      cantidad: 0
    },
    {
      id: 5,
      n_talla: '16',
      precio: 0,
      cantidad: 0
    },
    {
      id: 6,
      n_talla: 'S',
      precio: 0,
      cantidad: 0
    },
    {
      id: 7,
      n_talla: 'M',
      precio: 0,
      cantidad: 0
    },
    {
      id: 8,
      n_talla: 'L',
      precio: 0,
      cantidad: 0
    },
    {
      id: 9,
      n_talla: 'XL',
      precio: 0,
      cantidad: 0
    }]
  }

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
  /* onUpload(event: any) {

    const file = event.target.files[0];
  
    const filePath = 'name-to-upload-file-to'; 
  
    const fileRef = this.storage.ref(filePath);
  
    const task = this.storage.upload(filePath, file);
  
    task.snapshotChanges().pipe(
      
      finalize(() => {
  
        fileRef.getDownloadURL().subscribe(url => {
         this.url_img = url;
        });
  
      })
  
    ).subscribe();
  
  } */


 getColegio(id: string){
    this.firebaseService.getColegioPorId(id)
    .subscribe(colegio =>
      this.producto.colegio = colegio
    )
  }

  onSubmit(){
    this.firebaseService.addProducto(this.producto)
      .then()
      .catch(error => console.error('Error agregando:', error));
  }  

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params =>{
      const id = params['id'];
      this.getColegio(id);
    })

  }

}
