import { Component, OnInit } from '@angular/core';
import { getDownloadURL, Storage, ref, uploadBytes } from '@angular/fire/storage';
import { MaterialesService } from '../services/materiales.service';
import { ProveedoresService } from '../services/proveedores.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {

  file: File = {} as File;
  uploaded = false;
  existencia = 1;
  material = {
    id: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    cantidad: 0,
    unidadMedida: '',
    ubicacion: '',
    img_url: '',
    precio: 0,
    fechaAdquisicion: '',
    proveedor: {
      nombre: '',
      fono: '',
      direccion: ''
    }
  }

  proveedores = [{
      nombre: "AProveedor 1",
      fono: "+56912345678",
      direccion: "Calle Bonita 59, Independencia."
    },
    {
      nombre: "CProveedor 2",
      telefono: "+56912345678",
      direccion: "Calle Bonita 59, Independencia."
    },
    {
      nombre: "BProveedor 3",
      telefono: "+56912345678",
      direccion: "Calle Bonita 59, Independencia."
    }
  ]
  
  constructor(
    private storage: Storage,
    private materialesSvc: MaterialesService,
    private proveedorSvc: ProveedoresService
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
      this.materialesSvc.addMaterial(this.material)
      .then(value => {
        alert("Material agregado con éxito");
        if(this.existencia === 2){
          console.log("ESTOY DENTRO DEL IF EXISTENCIA")
          this.proveedorSvc.addProveedor(this.material.proveedor);
        }        
      })
      .catch(err => console.error("Error ",err));
    }else{
      alert("Debe agregar nombre y/o descripción del producto.")
    }
    
  }
  
  
  ngOnInit(): void{
    this.proveedorSvc.getProveedores().subscribe(
      data => {
        this.proveedores = data; 
      }
    )

  }

}
