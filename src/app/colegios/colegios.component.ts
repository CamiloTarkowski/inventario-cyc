import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ColegiosService } from '../services/colegios.service';
import { RegionesService } from '../services/regiones.service';

@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.component.html',
  styleUrls: ['./colegios.component.css']
})
export class ColegiosComponent {

  colegios!: any; 
  rutaActual!: string;
  editMode!: boolean[];
  colegioEnEdicion: any;
  regiones!: any;
  comunas!: any;
  regionSeleccionada = '';
  comunaSeleccionada = '';
  ciudadesFiltradas: any[] = [];
  alMenosUnoTrue: boolean = false;

  constructor(
    private colegiosSvc: ColegiosService,
    private regionesSvc: RegionesService) {
   }
  editarColegio(i: number, colegio: any) {
  this.editMode[i] = true;
  this.alMenosUnoVerdadero();
  this.colegioEnEdicion = { ...colegio }; // Hacer una copia para evitar modificar directamente el objeto original
  }
  guardarEdicion(i: number) {
    this.colegiosSvc.updateColegio(this.colegioEnEdicion.id, this.colegioEnEdicion);
    this.cancelarEdicion(i);
    this.todosFalsos();
  }
  cancelarEdicion(i: number) {
    this.editMode[i] = false;
    this.colegioEnEdicion = null;
    this.todosFalsos();
  }

  cargarComunas(event: any){
    this.colegioEnEdicion.region = event.target.value;
    this.comunas = this.regionesSvc.getComunas(this.colegioEnEdicion.region);

   }

   asignarComuna(event: any){
    this.colegioEnEdicion.comuna = event.target.value;
   }

   alMenosUnoVerdadero(){
    this.alMenosUnoTrue = this.editMode.some(valor => valor === true);
    console.log(this.alMenosUnoTrue);
   }
   todosFalsos(){
    this.alMenosUnoTrue = false;
   }

  ngOnInit(): void {
    this.colegios = this.colegiosSvc.getColegios().subscribe(data =>
      {
        this.colegios = data;
        this.editMode = Array(this.colegios.length).fill(false);
      }
    );
    this.regiones = this.regionesSvc.getRegiones();
    this.rutaActual = window.location.pathname;    

  }

}
