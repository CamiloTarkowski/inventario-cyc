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
    codigo: '0',
    colegio:'colegioql',
    nombre:'',
    n_talla:'',
    cantidad: '',
  };
  resumen: any[] = [];

  


constructor(private firebaseService: FirebaseService
   ) { }



colegioSelected(option: string): void {
  const id = parseInt(option);
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

productoSelected(option: string): void{
  const id = parseInt(option);
  this.tallas = this.getTallas(id);
  this.bool_producto = true;

}

tallaSelected(option: string): void{
  const id = parseInt(option);
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

pushProduct(){
  this.resumen.push(this.agregando_prod);
  this.agregando_prod = {
    codigo: '0',
    colegio:'',
    nombre:'',
    n_talla:'',
    cantidad: '',
  };
}




ngOnInit(): void {

  this.getColegios();
  this.getProductos();

  }
}
