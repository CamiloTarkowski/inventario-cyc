import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css']
})
export class VenderComponent {

  colegios!: any[];
  productos!: any[];
  producto: any;
  tallas: any[] | null = [] ;
  prodsFiltrados: any[] | null = [];

  bool_colegio: boolean = false;
  bool_producto: boolean = false;
  bool_talla: boolean = false;

  id!: number;

  agregando_prod = {
    id: '',
    colegio:'',
    nombre:'',
    n_talla:'',
    precio: 0,
    cantidad: 1,
    total: 0,
  };
  resumen: any[] = [];

  


constructor(private firebaseService: FirebaseService
   ) { }



colegioSelected(event: any): void {
  const selectedOption = event.target.options[event.target.selectedIndex];
  const id_colegio = selectedOption.getAttribute('id');
  this.prodsFiltrados = this.filtrar(id_colegio);
  
  if(this.prodsFiltrados.length > 0){
    this.tallas = this.getTallas(this.prodsFiltrados[0].id);
    this.bool_colegio = true;
  }
  else{
    this.tallas = [];
    this.bool_colegio = false;
    this.bool_producto = false;
    this.bool_talla = false;
  }
  
}

productoSelected(event: any): void{
  const selectedOption = event.target.options[event.target.selectedIndex];
  const id = selectedOption.getAttribute('id');
  this.agregando_prod.id = id;
  this.tallas = this.getTallas(id);
  this.bool_producto = true;

}

tallaSelected(event: any): void{
  const selectedOption = event.target.options[event.target.selectedIndex];
  const id = selectedOption.getAttribute('id');
  this.bool_talla = true;
}

getColegios(){
  this.firebaseService.getColegios().subscribe((colegios) => {
    this.colegios = colegios;
  })
}

getProductos(){
  this.firebaseService.getProductos().subscribe((productos) => {
    this.productos = productos;
  })
}

getTallas(id: number){
  let tallas : any [] | null = [];
  if(this.prodsFiltrados === null){
    return tallas = null;
  }
  else{
    for(let producto of this.prodsFiltrados){
      if (id == producto.id){
        tallas = producto.talla;
      }
    }
  }
  
  return tallas;
}

filtrar(id_colegio: string) { //filtrar por colegio
  let prodsFiltrados: any[] = [];
  for(let producto of this.productos){
    if(producto.colegio.id == id_colegio){
      prodsFiltrados.push(producto);
    }
  }
  return prodsFiltrados;
}

isTheSame(nuevo: any){
  if(this.resumen.length > 0){
    for (let producto of this.resumen){
      if(producto.id == nuevo.id && producto.n_talla == nuevo.n_talla){
          alert("Producto ya se encuentra ingresado.");
          return;
      }
    }
    this.resumen.push(nuevo)   
  }
  else{
    this.resumen.push(nuevo);
  }
}

onSubmit(){
  this.isTheSame(this.agregando_prod);
  this.agregando_prod = {
    id: '',
    colegio:'',
    nombre:'',
    n_talla:'',
    precio: 0,
    total: 0,
    cantidad: 1,
  };

  this.bool_colegio = false;
  this.bool_producto = false;
  this.bool_talla= false;

}

deleteProduct(index: number){
  this.resumen.splice(index, 1)
}



ngOnInit(): void {

  this.getColegios();
  this.getProductos();

  }
}
