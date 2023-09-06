import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  productos: any[] = [];
  prodsFiltrados : any[] = [];
  colegio: any;


  filtrar(id: string){
    console.log(this.productos);
    for(let producto of this.productos){
      if(producto.colegio.id === id){
        this.prodsFiltrados.push(producto);
      }
    }
    console.log(this.prodsFiltrados);
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

  ngOnInit(): void {
  this.route.params.subscribe((params) => {
    const id = params['id'];
    this.getColegio(id);

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
