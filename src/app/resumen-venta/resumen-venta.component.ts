import { Component, OnInit } from '@angular/core';
import { ResumenVentaService } from '../services/resumen-venta.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-resumen-venta',
  templateUrl: './resumen-venta.component.html',
  styleUrls: ['./resumen-venta.component.css']
})
export class ResumenVentaComponent implements OnInit {

resumen: any[] = [];
nuevoID: number = -1;

constructor(private res: ResumenVentaService,
  private firebaseService: FirebaseService ){
}

deleteProduct(index: number){
  this.resumen.splice(index, 1)
}

vender(){
  this.firebaseService.addVenta(this.resumen, this.nuevoID);
}



ngOnInit(): void {
  this.resumen = this.res.getResumen();
  this.firebaseService.getVentas().subscribe(data => {
    if(data.length > 0){
      this.nuevoID = (Math.max(...data.map(ven => ven.idVenta), -1)) + 1;
      
    }else{
      this.nuevoID = 1000000;
    }
  })
  }

}
