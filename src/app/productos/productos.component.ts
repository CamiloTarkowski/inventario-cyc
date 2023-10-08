import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

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

  
  constructor(private firebaseService: FirebaseService,
  private route: ActivatedRoute,
  private router: Router,
 ) { }

 getColegio(id: string): void {
  this.firebaseService.getColegioPorId(id).subscribe(colegio => {
    this.colegio = colegio;
  },
  err => {
    console.error("error: "+err);
  });
}

  async ngOnInit() {
    const params = await firstValueFrom(this.route.params);
    const id = params['id'];
    this.firebaseService.getColegioPorId(id).subscribe(
      data => { 
        this.colegio = data;
      }
    )

    this.firebaseService.getProductosByColegio(id).subscribe(data => {
      this.productos = data;
    });
  }
}
