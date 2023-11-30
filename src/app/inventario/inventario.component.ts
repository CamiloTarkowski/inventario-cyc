import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColegiosService } from '../services/colegios.service';
import { ProductosService } from '../services/productos.service';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})

export class InventarioComponent implements OnInit {

  productos: any[] = [];
  prodsFiltrados : any[] = [];
  colegio: any;

  constructor(
    private colegiosSvc: ColegiosService,
    private productosSvc: ProductosService,
    private route: ActivatedRoute,
    private router: Router,
   ) { }


  filtrar(id: number){
    for(let producto of this.productos){
      if(producto.colegio.id == id){
        this.prodsFiltrados.push(producto);
      }
    }
  }
  getColegio(id: string): void {
    this.colegiosSvc.getColegioPorId(id).subscribe(colegio => {
      this.colegio = colegio;
    });
  } 


 ngOnInit(): void {
  this.route.params.subscribe((params) => {
    const id = params['id'];
    this.getColegio(id.toString());

    this.productosSvc.getProductos().subscribe(
      (productos) => {
        this.productos = productos;
        this.filtrar(id);
      },
      (err) => {
        this.router.navigate(['/']);
      }
    );
  });
}
}
