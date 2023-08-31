import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumenVentaService {

  constructor() { }

  resumen: any[] = [];

  isTheSame(nuevo: any){
    console.log(nuevo)
    if(this.resumen.length > 0){
      for (let producto of this.resumen){
        if(producto.id === nuevo.id && producto.n_talla === nuevo.n_talla){
            alert("Producto ya se encuentra ingresado.");
            return;
        }
      }
      this.resumen.push(nuevo)   
    }
    else{
      this.resumen.push(nuevo);
    }
    this.getResumen();
  }

  getResumen(): any{
    return this.resumen;
  }
}
