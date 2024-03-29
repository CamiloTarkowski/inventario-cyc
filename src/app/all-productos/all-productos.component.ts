import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-all-productos',
  templateUrl: './all-productos.component.html',
  styleUrls: ['./all-productos.component.css']
})
export class AllProductosComponent implements OnInit {

  productos: any[] = [];
  min = 0;
  max = 0;
  unidades = 0;
  ruta!: string;

  constructor(
    private productosSvc: ProductosService){
  }

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


  ngOnInit(): void {
    this.productosSvc.getProductos().subscribe(data => {
      this.productos = data;
    })

    this.ruta = window.location.pathname; 
  }
}
