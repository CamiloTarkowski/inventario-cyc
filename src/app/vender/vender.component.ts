import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResumenVentaService } from '../services/resumen-venta.service';
import { ColegiosService } from '../services/colegios.service';
import { ProductosService } from '../services/productos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css']
})
export class VenderComponent implements OnInit{

  colegios: any[] = [];
  productos: any[] = [];
  tallas: any[] = [];
  prodsFiltrados: any[] | null = [];
  cantidad: number = 1;

  bool_colegio: boolean = false;
  id!: number;

  agregando_prod = {
    id: '',
    nombre:'',
    descripcion: '',
    img_url: '',
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
      ubicacion: '',
      cantVenta: 1,
      total: 0,
    }
  };

  resumen: any[] = [];

  


constructor(
  private colegiosSvc: ColegiosService,
  private productosSvc: ProductosService,
  private res: ResumenVentaService,
  private toastr: ToastrService
   ) { }



colegioSelected(event: any): void {
  const selectedOption = event.target.options[event.target.selectedIndex];
  const id_colegio = selectedOption.getAttribute('id');
  this.colegiosSvc.getColegioPorId(id_colegio).subscribe(colegio => {
    this.agregando_prod.colegio = colegio;

    }
  )
  this.productosSvc.getProductosByColegio(id_colegio).subscribe(
    productos => {
      this.prodsFiltrados = productos;
      this.agregando_prod = this.prodsFiltrados[0];

      if(this.prodsFiltrados.length > 0){
        this.tallas = this.getTallas(this.prodsFiltrados[0].id);
        this.bool_colegio = true;
        this.agregando_prod.talla = this.tallas[0];
        this.agregando_prod.talla.cantVenta = 1;
        this.agregando_prod.talla.total = this.agregando_prod.talla.cantVenta * this.agregando_prod.talla.precio;
      }
      else{
        this.tallas = [];
        this.bool_colegio = false;
      }
    }
  )
  
  
  
  
}

productoSelected(event: any): void{
  const selectedOption = event.target.options[event.target.selectedIndex];
  const id_producto = selectedOption.getAttribute('id');
  this.productosSvc.getProductoPorId(id_producto)
  .subscribe(producto => {
    const {talla, ...prodSinTalla } = producto;//prodSinTalla = producto - producto.talla (se traspasan todos los valores del elemento producto exceptuando el objeto talla)
    this.agregando_prod = prodSinTalla;
    this.tallas = producto.talla;
    this.agregando_prod.talla = producto.talla[0];
    this.agregando_prod.talla.cantVenta = 1;
    this.agregando_prod.talla.total = this.agregando_prod.talla.precio * this.agregando_prod.talla.cantVenta;
    
  });


}

tallaSelected(event: any): void{
  const selectedOption = event.target.options[event.target.selectedIndex];
  const id_talla = parseInt(selectedOption.getAttribute('id'));
  this.productosSvc.getProductoPorId(this.agregando_prod.id).subscribe(talla => { 
    this.agregando_prod.talla = talla.talla[id_talla];
    this.agregando_prod.talla.cantVenta = 1;
    this.agregando_prod.talla.total = this.agregando_prod.talla.cantVenta * this.agregando_prod.talla.precio;
    
  });
}


getData(){

  this.productosSvc.getProductos().subscribe(p => {
    this.productos = p;
  })

  this.colegiosSvc.getColegios().subscribe((colegios) => {
    for(let colegio of colegios){
      for(let producto of this.productos){
        if(colegio.id === producto.colegio.id){
          if (!this.colegios.includes(colegio)) {
            this.colegios.push(colegio);
          }
        }
      }
    }
    this.productosSvc.getProductosByColegio(this.colegios[0].id).subscribe(productos => {
      this.prodsFiltrados = productos;
      this.agregando_prod = this.prodsFiltrados[0];
      this.productosSvc.getProductoPorId(this.prodsFiltrados[0].id).subscribe((tallas) => {
        this.agregando_prod.talla = tallas.talla[0];
        this.agregando_prod.talla.cantVenta = 1;
        this.agregando_prod.talla.total = this.agregando_prod.talla.precio * this.agregando_prod.talla.cantVenta;
        
        this.tallas = tallas.talla;
        
      }
      )})
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
  console.log(this.agregando_prod.talla.cantidad)
  console.log(this.cantidad)
  if(this.agregando_prod.talla.cantidad >= this.cantidad){
    if(this.cantidad >= 1){
      const pushProducto = {...this.agregando_prod};
      this.res.isTheSame(pushProducto, this.cantidad);
      this.bool_colegio = false;
    } else{
      this.toastr.warning('La cantidad a vender no puede ser 0');
    }
  }else{
    const confirmacion = window.confirm(`La cantidad a vender supera el stock disponible. ¿Deseas continuar de todas formas?`);
    if(confirmacion){
      if(this.cantidad >= 1){
        const pushProducto = {...this.agregando_prod};
        this.res.isTheSame(pushProducto, this.cantidad);
        this.bool_colegio = false;
      } else{
        this.toastr.warning('La cantidad a vender no puede ser 0');
      }
    }else{
      this.toastr.info('Operación cancelada.')
    }
  }
}

ngOnInit(): void {
  this.getData();
}



reboot(){
  window.location.reload();
  }

}