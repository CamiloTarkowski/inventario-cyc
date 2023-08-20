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

  product = {
    categoria: ''
  };

  agregando_prod = {
    id: 10000,
    colegio:'',
    nombre:'',
    n_talla:'',
    cantidad: 1,
  };
  resumen: any[] = [];

  


constructor(private firebaseService: FirebaseService
   ) { }



colegioSelected(event: any): void {
  const selectedOption = event.target.options[event.target.selectedIndex];
  const id = parseInt(selectedOption.getAttribute('id'));
  this.prodsFiltrados = this.filtrar(id);
  if(this.prodsFiltrados.length !== 0){
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
  const id = parseInt(selectedOption.getAttribute('id'));
  this.agregando_prod.id = id;
  this.tallas = this.getTallas(id);
  this.bool_producto = true;

}

tallaSelected(event: any): void{
  const selectedOption = event.target.options[event.target.selectedIndex];
  const id = parseInt(selectedOption.getAttribute('id'));
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

filtrar(id: number) { //filtrar por colegio
  let prodsFiltrados: any[] = [];
  for(let producto of this.productos){
    if(producto.colegio.id == id){
      prodsFiltrados.push(producto);
    }
  }
  return prodsFiltrados;
}

guardarProducto(){
  console.log("la opción elegida es: "+this.product.categoria);
}

isTheSame(nuevo: any){
  let nuevaCantidad = 0;
  let same = false;

  for (let producto of this.resumen){
    if(producto.id == nuevo.id){
        if(producto.n_talla == nuevo.n_talla){
          same = true;
          nuevaCantidad = producto.cantidad + nuevo.cantidad;
          this.resumen[nuevo.id].cantidad = nuevaCantidad;
        }
    }
  }
  if(!same){
    this.resumen.push(nuevo);
  }
}

onSubmit(){
  this.isTheSame(this.agregando_prod);
  this.agregando_prod = {
    id: 0,
    colegio:'',
    nombre:'',
    n_talla:'',
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
