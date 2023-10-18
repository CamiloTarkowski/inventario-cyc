import { Component } from '@angular/core';
import { getDownloadURL, Storage, ref, uploadBytes } from '@angular/fire/storage';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {

  file: File = {} as File;
  uploaded = false;
  material!: any;
  existencia = 1;
  proveedores = [{
      nombre: "AProveedor 1",
      telefono: "+56912345678",
      direccion: "Calle Bonita 69, Independencia."
    },
    {
      nombre: "CProveedor 2",
      telefono: "+56912345678",
      direccion: "Calle Bonita 69, Independencia."
    },
    {
      nombre: "BProveedor 3",
      telefono: "+56912345678",
      direccion: "Calle Bonita 69, Independencia."
    }
  ]
  
  constructor(
    private storage: Storage,
    private firebaseService: FirebaseService
    ){

  }

  detectFile(event: any){
    if (event && event.files && event.files.length > 0){
      this.file = event.target.files[0];
      this.uploaded = true;
    }
    
  }

  onSubmit(){
    if(this.uploaded){
      const imgRef = ref(this.storage, `${this.material.categoria}/${this.file.name}`);
      uploadBytes(imgRef, this.file)
      .then((snapshot) => {
        return getDownloadURL(imgRef);
      })
      .then((downloadURL) => {
        this.material.img_url = downloadURL;       
        
      })
      .catch(err => {console.error('Error al cargar la imagen: ',err)})

    }else{
      console.log("Material ingresado sin imagen.");
    }
    if(this.material.nombre != "" && this.material.descripcion != ""){
      this.firebaseService.addProducto(this.material)
      .then(value => alert("Material agregado con éxito"))
      .catch(err => console.error("Error ",err));
    }else{
      alert("Debe agregar nombre y/o descripción del producto.")
    }
    
  }  


}
