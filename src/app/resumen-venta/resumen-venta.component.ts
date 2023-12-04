import { Component, OnInit } from '@angular/core';
import { ResumenVentaService } from '../services/resumen-venta.service';
import { VentasService } from '../services/ventas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resumen-venta',
  templateUrl: './resumen-venta.component.html',
  styleUrls: ['./resumen-venta.component.css']
})
export class ResumenVentaComponent implements OnInit {

resumen: any[] = [];
nuevoID: number = -1;
total: number = 0;
contador: number = 0;

constructor(
  private res: ResumenVentaService,
  private ventasSvc: VentasService
  ){}

calcularTotal(): number {
  this.total = this.resumen.reduce((acc, r) => acc + r.talla.total, 0);
  return this.total;
}

deleteProduct(index: number){
  this.resumen.splice(index, 1);
}

vender(){
  this.ventasSvc.addVenta(this.resumen, this.nuevoID);
}

ngOnInit(): void {



  this.resumen = this.res.getResumen();
  this.ventasSvc.getVentas().subscribe(data => {
    if(data.length > 0){
      this.nuevoID = (Math.max(...data.map(ven => ven.idVenta), -1)) + 1;
      
    }else{
      this.nuevoID = 1000000;
    }
  })
  }

}
