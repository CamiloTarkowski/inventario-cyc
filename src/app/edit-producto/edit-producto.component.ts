import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { ColegiosService } from '../services/colegios.service';
import { ProductosService } from '../services/productos.service';

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

  constructor(
    private colegioSvc: ColegiosService,
    private productoSvc: ProductosService,
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
    this.colegioSvc.getColegioPorId(id)
    .subscribe(colegio => {
      this.producto.colegio = colegio
      console.log(colegio);
    }
      
    )
  }
  getProducto(id: string){
    this.productoSvc.getProductoPorId(id).subscribe( data => {
      this.producto = data; 
    })
  }

  onSubmit(){
    this.productoSvc.addProducto(this.producto)
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
    this.productoSvc.updateProducto(this.id, this.producto)
  }
}
