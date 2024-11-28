import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: any;
  id!: string;

  constructor(
    private productosSvc: ProductosService,
    private route: ActivatedRoute) { }

  getProducto(id: string){
    this.productosSvc.getProductoPorId(id).subscribe((producto) =>{
      this.producto = producto;
    });

  }
  
  getId(){
    
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => { this.id = params['id'] });
    this.productosSvc.getProductoPorId(this.id).subscribe((producto) =>{ this.producto = producto });

  }

}
