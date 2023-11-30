import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ColegiosService } from '../services/colegios.service';

@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.component.html',
  styleUrls: ['./colegios.component.css']
})
export class ColegiosComponent {

  colegios$!: Observable<any[]>; 
  mostrarFormulario = false;
  rutaActual!: string;

  constructor(
    private colegiosSvc: ColegiosService) {
   }

  ngOnInit(): void {
    this.colegios$ = this.colegiosSvc.getColegios();
    this.rutaActual = window.location.pathname;    

  }

}
