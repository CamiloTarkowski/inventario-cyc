import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ColegiosService } from '../services/colegios.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  colegios$! : Observable<any[]>;
  mostrarFormulario = false;


  constructor(private colegiosSvc : ColegiosService) { }

  ngOnInit(): void {

    this.colegios$ = this.colegiosSvc.getColegios();
    this.mostrarFormulario = false;


  }

}
