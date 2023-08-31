import { Component, OnInit } from '@angular/core';
import { ResumenVentaService } from '../services/resumen-venta.service';

@Component({
  selector: 'app-resumen-venta',
  templateUrl: './resumen-venta.component.html',
  styleUrls: ['./resumen-venta.component.css']
})
export class ResumenVentaComponent implements OnInit {

resumen: any[] = [];

constructor(private res: ResumenVentaService ){
}

deleteProduct(index: number){
  this.resumen.splice(index, 1)
}



ngOnInit(): void {
  this.resumen = this.res.getResumen();

  }

}
