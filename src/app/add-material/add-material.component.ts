import { Component, OnInit } from '@angular/core';
import { getDownloadURL, Storage, ref, uploadBytes } from '@angular/fire/storage';
import { MaterialesService } from '../services/materiales.service';
import { ProveedoresService } from '../services/proveedores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {

  form: FormGroup;

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
      direccion: '',
      email: ''
    }
  }
  proveedores: any = [];

  
  constructor(
    private storage: Storage,
    private materialesSvc: MaterialesService,
    private proveedorSvc: ProveedoresService,
    private formBuilder: FormBuilder
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
