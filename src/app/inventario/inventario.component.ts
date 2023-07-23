import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  productos: Producto[] = [
    {id: 0, nombre: "Polera polo roja",descripcion: "Polera de algodón roja del colegio Alcántara", colegio: {id: 0, nombre : "Alcántara"},
    talla: [
      {id: 0, n_talla: "6", cantidad: 5, precio: 9999 },
      {id: 1, n_talla: "8", cantidad: 7, precio: 9999 },
      {id: 2, n_talla: "10", cantidad: 8, precio: 9999 },
      {id: 3, n_talla: "12", cantidad: 11, precio: 9999 },
      {id: 4, n_talla: "14", cantidad: 9, precio: 9999 },
      {id: 5, n_talla: "16", cantidad: 0, precio: 9999 },
      {id: 6, n_talla: "S", cantidad: 11, precio: 9999 },
      {id: 7, n_talla: "M", cantidad: 5, precio: 9999 },
      {id: 8, n_talla: "L", cantidad: 2, precio: 9999 },
      {id: 9, n_talla: "XL", cantidad: 0, precio: 9999 },]},

      {id: 6, nombre: "Polera Piqué",descripcion: "Polera de algodón blanca del colegio Alcántara", colegio: {id: 0, nombre : "Alcántara"},
      talla: [
        {id: 0, n_talla: "6", cantidad: 0, precio: 9999 },
        {id: 1, n_talla: "8", cantidad: 7, precio: 9999 },
        {id: 2, n_talla: "10", cantidad: 0, precio: 9999 },
        {id: 3, n_talla: "12", cantidad: 0, precio: 9999 },
        {id: 4, n_talla: "14", cantidad: 0, precio: 9999 },
        {id: 5, n_talla: "16", cantidad: 0, precio: 9999 },
        {id: 6, n_talla: "S", cantidad: 0, precio: 9999 },
        {id: 7, n_talla: "M", cantidad: 3, precio: 9999 },
        {id: 8, n_talla: "L", cantidad: 4, precio: 9999 },
        {id: 9, n_talla: "XL", cantidad: 2, precio: 9999 },]},


]

  constructor() { }

  ngOnInit(): void {
  }

}
