import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { RegionesService } from '../services/regiones.service';



@Component({
  selector: 'app-add-colegio',
  templateUrl: './add-colegio.component.html',
  styleUrls: ['./add-colegio.component.css']
})
export class AddColegioComponent {

    regiones: any;
    comunas: any;
    regionSeleccionada = '';
    comunaSeleccionada = '';
    colegio = {
        nombre: '',
        fullname: '',
        region: '',
        comuna: ''
    }

    ciudadesFiltradas: any[] = [];

  constructor(private firebaseService: FirebaseService,
    private regionesService: RegionesService) {
    
   }

   cargarComunas(event: any){
    this.colegio.region = event.target.value;
    this.comunas = this.regionesService.getComunas(this.colegio.region);

   }

   asignarComuna(event: any){
    this.colegio.comuna = event.target.value;
   }



  agregarColegio() {
    if(this.colegio.nombre != null || this.colegio.fullname != null || this.colegio.region != null || this.colegio.comuna != null){
        this.firebaseService.addColegio(this.colegio)
        .then()
        .catch(error => console.error('Error agregando:', error));
    }else{
        alert("Debe llenar todos los campos.");
    }
    
  }
  
  ngOnInit(): void {
    this.regiones = this.regionesService.getRegiones();

  }

}
