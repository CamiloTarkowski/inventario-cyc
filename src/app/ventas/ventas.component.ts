import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  //ventas: any[] = [];
  ruta!: string;
  ventasPorPagina = 10;
  paginaActual = 1;
  ventas = [
    {idVenta: 1000000,
      id: 100000,
    fecha: "06 de octubre del 2023, 15:09",
    total: 99999,
    resumen: [
      {nombre: "Polera polo no se cuanto"},
    {nombre: "Polera polo no se cuanto"}
  ]},
  {idVenta: 1000000,
    id: 100000,
  fecha: "06 de octubre del 2023, 15:09",
  total: 99999,
  resumen: [
    {nombre: "Polera polo no se cuanto"},
  {nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
      id: 100000,
    fecha: "06 de octubre del 2023, 15:09",
    total: 99999,
    resumen: [
      {nombre: "Polera polo no se cuanto"},
    {nombre: "Polera polo no se cuanto"}
  ]},{idVenta: 1000000,
    id: 100000,
  fecha: "06 de octubre del 2023, 15:09",
  total: 99999,
  resumen: [
    {nombre: "Polera polo no se cuanto"},
  {nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
      id: 100000,
    fecha: "06 de octubre del 2023, 15:09",
    total: 99999,
    resumen: [
      {nombre: "Polera polo no se cuanto"},
    {nombre: "Polera polo no se cuanto"}
  ]},{idVenta: 1000000,
    id: 100000,
  fecha: "06 de octubre del 2023, 15:09",
  total: 99999,
  resumen: [
    {nombre: "Polera polo no se cuanto"},
  {nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "Polera polo no se cuanto"}
]},{idVenta: 1000000,
  id: 100000,
fecha: "06 de octubre del 2023, 15:09",
total: 99999,
resumen: [
  {nombre: "Polera polo no se cuanto"},
{nombre: "AAAAAAAAAAAAAAAAAAAAAAAA"}
]}
  ]

  constructor(private firebaseService: FirebaseService){

  }

  ngOnInit(): void{

    /* this.firebaseService.getVentas().subscribe(ventas => {
      this.ventas = ventas;

    }) */

    this.ruta = window.location.pathname;

    
  }

}
