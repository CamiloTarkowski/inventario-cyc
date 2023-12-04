import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDownloadURL, Storage, ref, uploadBytes } from '@angular/fire/storage';
import { firstValueFrom } from 'rxjs';
import { ColegiosService } from '../services/colegios.service';
import { ProductosService } from '../services/productos.service';


@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent {
  

  url_img: string = '';
  uploaded = false;  

  producto = {
    nombre: '',
    descripcion: '',
    img_url: '',
    colegio: {
      nombre: '',
      fullname: '',
      id: ''
    },
    talla: [{
      id: 0,
      n_talla: '6',
      precio: 0,
      cantidad: 0,
      ubicacion: ""
    },
    {
      id: 1,
      n_talla: '8',
      precio:0,
      cantidad: 0,
      ubicacion: ""
    },
    {
      id: 2,
      n_talla: '10',
      precio: 0,
      cantidad: 0,
      ubicacion: ""
    },
    {
      id: 3,
      n_talla: '12',
      precio: 0,
      cantidad: 0,
      ubicacion: ""
    },
    {
      id: 4,
      n_talla: '14',
      precio: 0,
      cantidad: 0,
      ubicacion: ""
    },
    {
      id: 5,
      n_talla: '16',
      precio: 0,
      cantidad: 0,
      ubicacion: ""
    },
    {
      id: 6,
      n_talla: 'S',
      precio: 0,
      cantidad: 0,
      ubicacion: ""
    },
    {
      id: 7,
      n_talla: 'M',
      precio: 0,
      cantidad: 0,
      ubicacion: ""
    },
    {
      id: 8,
      n_talla: 'L',
      precio: 0,
      cantidad: 0,
      ubicacion: ""
    },
    {
      id: 9,
      n_talla: 'XL',
      precio: 0,
      cantidad: 0,
      ubicacion: ""
    }]
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private storage: Storage,
    private colegiosSvc: ColegiosService,
    private productosSvc: ProductosService){
      
  }
  file: File = {} as File;

  detectFile(event: any){
    if (event && event.files && event.files.length > 0){
      this.file = event.target.files[0];
      this.uploaded = true;
    }
  }

 getColegio(id: string){
    this.colegiosSvc.getColegioPorId(id)
    .subscribe(colegio =>
      this.producto.colegio = colegio
    )
  }

  onSubmit(){
    if(this.uploaded){

      const imgRef = ref(this.storage, `colegios/${this.producto.colegio.nombre}/${this.file.name}`);
      uploadBytes(imgRef, this.file)
      .then((snapshot) => {
        return getDownloadURL(imgRef);
      })
      .then((downloadURL) => {
        this.producto.img_url = downloadURL;       
        
      })
      .catch(err => {console.error('Error al cargar la imagen: ',err)})

    }else{
      console.log("Producto ingresado sin imagen.");
    }
    if(this.producto.nombre != "" && this.producto.descripcion != ""){
      this.productosSvc.addProducto(this.producto)
      .then(value => alert("Producto agregado con éxito"))
      .catch(err => console.error("Error ",err));
    }else{
      alert("Debe agregar nombre y/o descripción del producto.")
    }
    
  }  

  async ngOnInit() {
      const params = await firstValueFrom(this.activateRoute.params);
      const id = params['id'];
      this.getColegio(id);

  }

}
