import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent {


  producto = {
    nombre: '',
    descripcion: '',
    colegio: {
      nombre: '',
      fullname: '',
      id: ''
    },
    tallas: [{
      id: 0,
      n_talla: '6',
      precio: 0,
      cantidad: 0
    },
    {
      id: 1,
      n_talla: '8',
      precio:0,
      cantidad: 0
    },
    {
      id: 2,
      n_talla: '10',
      precio: 0,
      cantidad: 0
    },
    {
      id: 3,
      n_talla: '12',
      precio: 0,
      cantidad: 0
    },
    {
      id: 4,
      n_talla: '14',
      precio: 0,
      cantidad: 0
    },
    {
      id: 5,
      n_talla: '16',
      precio: 0,
      cantidad: 0
    },
    {
      id: 6,
      n_talla: 'S',
      precio: 0,
      cantidad: 0
    },
    {
      id: 7,
      n_talla: 'M',
      precio: 0,
      cantidad: 0
    },
    {
      id: 8,
      n_talla: 'L',
      precio: 0,
      cantidad: 0
    },
    {
      id: 9,
      n_talla: 'XL',
      precio: 0,
      cantidad: 0
    }]
  }

  constructor(private firebaseService: FirebaseService,
    private activateRoute: ActivatedRoute){
  }

 getColegio(id: string){
    this.firebaseService.getColegioPorId(id).subscribe(
      colegio => this.producto.colegio = colegio
    )
  }


  onSubmit(){
    this.firebase
    
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params =>{
      const id = params['id'];
      this.getColegio(id);
    })
  }
}
