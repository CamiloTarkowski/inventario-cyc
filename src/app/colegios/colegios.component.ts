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
  comunas: any;
  regionSeleccionada = '';
  comunaSeleccionada = '';
  ciudadesFiltradas: any[] = [];

  constructor(
    private colegiosSvc: ColegiosService,
    private regionesSvc: RegionesService) {
   }
  editarColegio(i: number, colegio: any) {
  this.editMode[i] = true;
  this.colegioEnEdicion = { ...colegio }; // Hacer una copia para evitar modificar directamente el objeto original
  }
  guardarEdicion(i: number) {
    // Lógica para guardar los cambios, por ejemplo, a través de tuServicio
    this.colegiosSvc.updateColegio(this.colegioEnEdicion.id, this.colegioEnEdicion);
      // Actualizar la lista de colegios después de editar
      //this.colegios$ = this.colegiosSvc.getColegios();
      // Salir del modo de edición
      this.cancelarEdicion(i);
  }
  cancelarEdicion(i: number) {
    this.editMode[i] = false;
    this.colegioEnEdicion = null;
  }

  ngOnInit(): void {
    this.colegios = this.colegiosSvc.getColegios().subscribe( data =>
      {
        this.colegios = data;
        this.editMode = Array(this.colegios.length).fill(false);
      }
    );
    this.regiones = this.regionesSvc.getRegiones;
    this.rutaActual = window.location.pathname;    

  }

}
