import { Component, OnInit } from '@angular/core';
import { Colegio } from '../interfaces/colegio.interface';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  colegio: Colegio[] = [{id:0, nombre : "Alcántara"},
  {id:1, nombre : "Alerces"},
  {id:2, nombre : "Luis Undurraga"},
  {id:3, nombre : "Niño Jesús"}];

  constructor() { }

  ngOnInit(): void {
  }

}
