import { Component, OnInit } from '@angular/core';
import { VentasService } from '../services/ventas.service';

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

  constructor(
    private ventasSvc: VentasService){

  }

  ngOnInit(): void{

    this.ventasSvc.getVentas().subscribe(ventas => {
      this.ventas = ventas;

    }) 

    this.ruta = window.location.pathname;

    
  }

}
