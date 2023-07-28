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

  id!: number;
  


constructor(private firebaseService: FirebaseService
   ) { }



colegioSelected(option: string): void {
  const id = parseInt(option);
  this.prodsFiltrados = this.filtrar(id);
  if(this.prodsFiltrados !== null){
    this.tallas = this.getTallas(this.prodsFiltrados[0].id);
  }
  else{
    this.tallas = null;
  }
  
}

productoSelected(option: string): void{
  const id = parseInt(option);
  this.tallas = this.getTallas(id);

}

tallaSelected(option: string): void{
  const id = parseInt(option);


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




ngOnInit(): void {

  this.getColegios();
  this.getProductos();

  }
}
