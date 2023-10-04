import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { getDownloadURL, Storage, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-add-product-noschool',
  templateUrl: './add-product-noschool.component.html',
  styleUrls: ['./add-product-noschool.component.css']
})
export class AddProductNoschoolComponent implements OnInit{
  url_img: string = '';
  colegios: any;  

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

  constructor(private firebaseService: FirebaseService,
    private storage: Storage){

  }

  file: File = {} as File;

  detectFile(event: any){
    this.file = event.target.files[0];
  }

  colegioSelected(event: any): void {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const id_colegio = selectedOption.getAttribute('id');
    this.firebaseService.getColegioPorId(id_colegio).subscribe(
      data => { this.producto.colegio = data }
    )
  }

  subirArchivo(fileInput: any){
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      // Obtiene el primer archivo seleccionado (puedes manejar múltiples archivos si es necesario)
      const file = fileInput.files[0];

      const imgRef = ref(this.storage, `images/${file.name}`)

      uploadBytes(imgRef, file)
      .then(x => {console.log(x)})
      .catch(err => {console.error(err)})
    }else{
      alert("Debes agregar la imagen del producto.")
      return
    }
  }

  onSubmit(){
    if(this.file){
      const imgRef = ref(this.storage, `${this.producto.colegio.nombre}/${this.file.name}`);

      uploadBytes(imgRef, this.file)
      .then((snapshot) => {
        return getDownloadURL(imgRef);
      })
      .then((downloadURL) => {
        this.producto.img_url = downloadURL;
        this.firebaseService.addProducto(this.producto)
        .then(value => alert("Producto agregado con éxito"))
        .catch(err => console.error("Error ",err));
        
      })
      .catch(err => {console.error('Error al cargar la imagen: ',err)})

    }else{
      console.log("Producto ingresado sin imagen.");
    }
  }  

  ngOnInit(): void{
    this.firebaseService.getColegios().subscribe(data => {
      this.colegios = data;
    })
  }

}
