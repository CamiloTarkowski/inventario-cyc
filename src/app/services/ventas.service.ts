import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProductosService } from './productos.service';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private productSvc: ProductosService) { }

  async addVenta(resumen: any, nuevoID: number){
    const fecha = new Date();
    const formatoFecha: Intl.DateTimeFormatOptions = {
    weekday: 'long',  
    day: 'numeric',   
    month: 'long',    
    year: 'numeric',  
    hour: 'numeric',    
    minute: 'numeric' 
    };
    const fechaFormateada = fecha.toLocaleString('es-ES', formatoFecha);
    const total = resumen.reduce((sumatoria: number, resumen: any) => {
      return sumatoria + resumen.talla.total;
    }, 0);

    const venta = {
      idVenta: nuevoID,
      resumen: resumen,
      fecha: fechaFormateada,
      total: total
    }
    
    this.router.navigate(['/colegios']);
    this.productSvc.actualizarStock(resumen);
    return this.db.list('ventas').push(venta);
        
  }
  getVentas(): Observable<any[]> {
    return this.db.list('ventas').snapshotChanges().pipe(
      map(changes =>
        changes.map((v: any) => ({
          id: v.payload.key,
          ...v.payload.val()
        }))
      ),
      map(ventas =>
        ventas.sort((a, b) => b.idVenta - a.idVenta)
      )
    );
  }

  getVenta(id: number): Observable<any> {
    return this.db.object(`ventas/${id}`).valueChanges();
  }
}
