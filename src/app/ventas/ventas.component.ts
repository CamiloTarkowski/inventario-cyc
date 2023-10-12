import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventas: any[] = [];
  ruta!: string;
  ventasPorPagina = 10;
  paginaActual = 1;

  constructor(private firebaseService: FirebaseService){

  }

  ngOnInit(): void{

    this.firebaseService.getVentas().subscribe(ventas => {
      this.ventas = ventas;

    }) 

    this.ruta = window.location.pathname;

    
  }

}
