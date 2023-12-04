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
  selectedProveedorIndex: number | null = null;
   show: boolean = false;
  indx: number = -1;

  constructor(
    private proveedorSvc: ProveedoresService
  ) {
    this.proveedorSvc.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
    });
   }

   
   
   mostrarProveedor(index: number) {
       this.selectedProveedorIndex = index;
       this.show = !this.show;
   }

  ngOnInit(): void {
  }

}
