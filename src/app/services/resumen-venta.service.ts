import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumenVentaService {

  constructor() { }

  resumen: any[] = [];

  isTheSame(nuevo: any, cantidad: number){
    if(this.resumen.length > 0){
      for (let producto of this.resumen){
        if(producto.id === nuevo.id && producto.talla.id === nuevo.talla.id){
            alert("Producto ya se encuentra ingresado.");
            return;
        }
      }
      nuevo.talla.cantVenta = cantidad;
      nuevo.talla.total = cantidad * nuevo.talla.precio;
      this.resumen.push(nuevo);
      return;  
    }
    else{
      nuevo.talla.cantVenta = cantidad;
      nuevo.talla.total = cantidad * nuevo.talla.precio;
      this.resumen.push(nuevo);
      return;
    }
  }

  getResumen(): any{
    return this.resumen;
  }

}
