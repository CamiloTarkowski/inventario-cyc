import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.component.html',
  styleUrls: ['./colegios.component.css']
})
export class ColegiosComponent {

  colegios$!: Observable<any[]>; 
  mostrarFormulario = false;
  rutaActual!: string;

  constructor(private firebaseService : FirebaseService) {
   }

  ngOnInit(): void {
    this.colegios$ = this.firebaseService.getColegios();
    this.rutaActual = window.location.pathname;    

  }

}
