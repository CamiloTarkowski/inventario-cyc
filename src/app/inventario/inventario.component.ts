import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})

export class InventarioComponent implements OnInit {

  productos: any[] = [];
  prodsFiltrados : any[] = [];
  colegio: any;


  filtrar(id: number){
    for(let producto of this.productos){
      if(producto.colegio.id == id){
        this.prodsFiltrados.push(producto);
      }
    }
  }
  getColegio(id: string): void {
    this.firebaseService.getColegioPorId(id).subscribe(colegio => {
      this.colegio = colegio;
    });
  } 

  constructor(private firebaseService: FirebaseService,
  private route: ActivatedRoute,
  private router: Router,
 ) { }

 ngOnInit(): void {
  this.route.params.subscribe((params) => {
    const id = params['id'];
    this.getColegio(id.toString());

    this.firebaseService.getProductos().subscribe(
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
