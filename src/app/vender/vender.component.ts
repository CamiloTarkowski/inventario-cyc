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
  prodsFiltrados!: any[];
  colegioSeleccionado: boolean = false;
  selectedOption: string | undefined;
  id!: number;
  


constructor(private firebaseService: FirebaseService
   ) { }

onOptionSelected(option: string): void {
  this.selectedOption = option;
  this.id = parseInt(option);
  this.colegioSeleccionado = true;
  this.filtrar(this.id);
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

filtrar(id: number){ //filtrar por colegio
  for(let producto of this.productos){
    if(producto.colegio.id == id){
      this.prodsFiltrados.push(producto);
    }
  }
}


ngOnInit(): void {

  this.getColegios();
  this.getProductos();

  }
}
