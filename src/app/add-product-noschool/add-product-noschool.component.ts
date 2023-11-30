import { Component, OnInit } from '@angular/core';
import { getDownloadURL, Storage, ref, uploadBytes } from '@angular/fire/storage';
import { ColegiosService } from '../services/colegios.service';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-add-product-noschool',
  templateUrl: './add-product-noschool.component.html',
  styleUrls: ['./add-product-noschool.component.css']
})
export class AddProductNoschoolComponent implements OnInit{
  url_img: string = '';
  colegios: any;
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
    private storage: Storage,
    private productosSvc: ProductosService,
    private colegiosSvc: ColegiosService){

  }

  file: File = {} as File;

  detectFile(event: any){
    if (event && event.files && event.files.length > 0){
      this.file = event.target.files[0];
      this.uploaded = true;
    }
  }

  colegioSelected(event: any): void {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const id_colegio = selectedOption.getAttribute('id');
    this.colegiosSvc.getColegioPorId(id_colegio).subscribe(
      data => { this.producto.colegio = data }
    )
  }

  onSubmit(){
    if(this.uploaded){
      const imgRef = ref(this.storage, `${this.producto.colegio.nombre}/${this.file.name}`);
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

  ngOnInit(): void{
    this.colegiosSvc.getColegios().subscribe(data => {
      this.colegios = data;
      this.producto.colegio = data[0];
    })
  }

}
