import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ColegiosService } from '../services/colegios.service';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];
  colegio: any;




  minimo(producto: any){
    const tallas = producto.talla;
    let minimo = Number.MAX_VALUE;
    for(const talla of tallas){
      if(talla.precio < minimo){
        minimo = talla.precio;
      }
    }
    return minimo;
  }

  maximo(producto: any){
    const tallas = producto.talla;
    let maximo = 0;
    for(const talla of tallas){
      if(talla.precio > maximo){
        maximo = talla.precio;
      }
    }
    return maximo;
  }

  cantTotal(producto: any){
    const tallas = producto.talla;
    const cantidadTotal = tallas.reduce((total: number, talla: any) => total + talla.cantidad, 0);
    return cantidadTotal;

  }

  
  constructor(
  private colegiosSvc: ColegiosService,
  private productosSvc: ProductosService,
  private route: ActivatedRoute
 ) { }

 getColegio(id: string): void {
  this.colegiosSvc.getColegioPorId(id).subscribe(colegio => {
    this.colegio = colegio;
  },
  err => {
    console.error("error: "+err);
  });
}

  async ngOnInit() {
    const params = await firstValueFrom(this.route.params);
    const id = params['id'];
    this.colegiosSvc.getColegioPorId(id).subscribe(
      data => { 
        this.colegio = data;
      }
    )

    this.productosSvc.getProductosByColegio(id).subscribe(data => {
      this.productos = data;
    });
  }
}
