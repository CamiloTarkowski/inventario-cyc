import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: any;
  id!: string;

  constructor(private firebaseService: FirebaseService,
    private route: ActivatedRoute) { }

  getProducto(id: string){
    this.firebaseService.getProductoPorId(id).subscribe((producto) =>{
      this.producto = producto;
    });

  }
  
  getId(){
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {

    this.getId();
    this.getProducto(this.id);

  }

}
