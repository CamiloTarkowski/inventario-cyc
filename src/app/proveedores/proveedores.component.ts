import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  rutaActual!: string;
  proveedores: any;

  constructor(
    private proveedorSvc: ProveedoresService
  ) {
    this.proveedorSvc.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
    });
   }

  ngOnInit(): void {
  }

}
