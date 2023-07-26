import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cloudinary } from '@cloudinary/url-gen';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

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
  getColegio(colegioId: number): void {
    this.firebaseService.getColegioPorId(colegioId).subscribe(colegio => {
      this.colegio = colegio;
    });
  }

 

  constructor(private firebaseService: FirebaseService,
  private route: ActivatedRoute,
  private router: Router,
 ) { }

 ngOnInit(): void {
  const cld = new Cloudinary({cloud: {cloudName: 'ddzvvd9de'}});
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
