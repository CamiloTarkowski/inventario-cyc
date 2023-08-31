import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { ResumenVentaService } from '../services/resumen-venta.service';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css']
})
export class VenderComponent implements OnInit {

  colegios!: any[];
  productos!: any[];
  tallas: any[] | null = [] ;
  prodsFiltrados: any[] | null = [];

  bool_colegio: boolean = false;
  id!: number;

  agregando_prod = {
    id: '',
    nombre:'',
    descripcion: '',
    colegio: {
      id: '',
      nombre:'',
      fullname:'',
    },
    talla: {
      id: -1,
      precio: -1,
      cantidad: -1,
      n_talla: '',
      ubicacion: ''
    }
  };

  resumen: any[] = [];

  


constructor(
  private firebaseService: FirebaseService,
  private res: ResumenVentaService
   ) { }



colegioSelected(event: any): void {
  const selectedOption = event.target.options[event.target.selectedIndex];
  const id_colegio = selectedOption.getAttribute('id');
  this.firebaseService.getColegioPorId(id_colegio).subscribe(colegio => {
    this.agregando_prod.colegio = colegio;
    }
  )
  this.prodsFiltrados = this.filtrar(id_colegio);
  this.agregando_prod = this.prodsFiltrados[0];
  
  if(this.prodsFiltrados.length > 0){
    this.tallas = this.getTallas(this.prodsFiltrados[0].id);
    this.bool_colegio = true;
    this.agregando_prod.talla = this.tallas[0];
  }
  else{
    this.tallas = [];
    this.bool_colegio = false;
  }
  
}

productoSelected(event: any): void{
  const selectedOption = event.target.options[event.target.selectedIndex];
  const id_producto = selectedOption.getAttribute('id');
  this.firebaseService.getProductoPorId(id_producto)
  .subscribe(producto => {
    const {talla, ...prodSinTalla } = producto;//prodSinTalla = producto - producto.talla (se traspasan todos los valores del elemento producto exceptuando el objeto talla)
    this.agregando_prod = prodSinTalla;
    
  });
  this.tallas = this.getTallas(id_producto);

}

tallaSelected(event: any): void{
  const selectedOption = event.target.options[event.target.selectedIndex];
  const id_talla = parseInt(selectedOption.getAttribute('id'));
  this.firebaseService.getTallaDeProducto(this.agregando_prod.id, id_talla).subscribe(talla => 
    console.log(talla));
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
  let tallas: any[] = [];
  if(this.prodsFiltrados === null){
    return tallas = [];
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



agregar(){
  this.res.isTheSame(this.agregando_prod);
  console.log(this.agregando_prod);
  this.bool_colegio = false;

}




ngOnInit(): void {

  this.getColegios();
  this.getProductos();
  }

reboot(){
  window.location.reload();
  }

}