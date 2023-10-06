import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, map, firstValueFrom } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase,
    private router: Router) {
   }

  getProductos(){
     return this.db.list('productos').snapshotChanges().pipe(
      map(changes =>
        changes.map((p: any) => ({
          id: p.payload.key,
          ...p.payload.val()
        }))
      ),
      map(productos => productos.sort((a, b) => a.nombre.localeCompare(b.nombre)))
    );
  }
  
  getProductoPorId(id: string): Observable<any> {
    return this.db.object(`productos/${id}`)
    .snapshotChanges()
    .pipe(
      map((snapshot: any) => {
        const data = snapshot.payload.val(); // 'data' son los valores del elemento
        const id = snapshot.payload.key; // id es el 'document id' de este elemento 
        return { id, ...data };  //se retorna el elemento + el id del documento
      })
   );  
  }

  getColegios(): Observable<any[]> {
    return this.db.list('colegios').snapshotChanges().pipe(
      map(changes =>
        changes.map((c:any) => ({
          id: c.payload.key,
          ...c.payload.val()
        }))
      ),
      map(colegios => colegios.sort((a, b) => a.nombre.localeCompare(b.nombre)))
    );
  }

  getColegioPorId(id: string): Observable<any> {
    return this.db.object(`colegios/${id}`)
    .snapshotChanges()
    .pipe(
      map((snapshot: any) => {
        const data = snapshot.payload.val(); // 'data' son los valores del elemento
        const id = snapshot.payload.key; // id es el 'document id' de este elemento 
        return { id, ...data };  //se retorna el elemento + el id del documento
      })
   );  
  }

  getProductosByColegio(colegioId: string): Observable<any[]> {

    return this.db.list('productos', ref => {
      return ref.orderByChild('colegio/id').equalTo(colegioId); 
    })
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map((c: any) => ({
          id: c.payload.key,
          ...c.payload.val()
        }))
      })
    )
  
  }

  getTallasByProducto(productoId: string) {
    return this.db.object(`/productos/${productoId}`).valueChanges(); 
  }

  async addColegio(col: any) {
    let colegios: any;
    this.getColegios()
      .subscribe(data => {  
        colegios = data;
        if (colegios.some((c: any) => c.nombre === col.nombre)) {
          return;
        }
        else{
          const colegio = {
            nombre: col.nombre,
            fullname: col.fullname,
            comuna: col.comuna,
            region: col.region
          }
          this.router.navigate(['/colegios']);
          return this.db.list('colegios').push(colegio);
        }
      });
  }

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
    this.actualizarStock(resumen);
    return this.db.list('ventas').push(venta);
        
  }

  async addProducto(producto: any) {
    let productos: any;

    this.getProductos()
      .subscribe(data => {
        productos = data;
        if (productos.some((p: any) => p.nombre === producto.nombre)) {
         return;
       }
       else{
        console.log("holaaaaaaaa");
       }
       const productRef = this.db.list('/productos');
       const idColegio = producto.colegio.id;
       this.router.navigate(['/productos/'+idColegio]);
       return productRef.push(producto);
       })
  }

  getTallaDeProducto(idProducto: string, idTalla: number) {
    return this.db.object(`/productos/${idProducto}/talla/${idTalla}`).valueChanges();
  }

  updateColegio(id: string, updatedColegio: any) {
    
    console.log("Colegio actualizado con éxito. ");
    this.router.navigate(['/colegios']);
    return this.db.object(`colegios/${id}`).update(updatedColegio);
  }

  updateProducto(id: string, updatedProducto: any) {

    console.log("Producto actualizado con éxito. ");
    this.router.navigate(['productos/',updatedProducto.colegio.id]);
    return this.db.object(`productos/${id}`).update(updatedProducto);
 }

 

  getVentas(): Observable<any[]> {
    return this.db.list('ventas').snapshotChanges().pipe(
      map(changes =>
        changes.map((v:any) => ({
          id: v.payload.key,
          ...v.payload.val()
        }))
      )
    );
  }

  getVenta(id: number): Observable<any> {
    return this.db.object(`ventas/${id}`).valueChanges();

  }

  

  async actualizarStock(resumen: any[]) {
    for (const r of resumen) {
      let idTalla = (r.talla.id).toString();
      const productoRefconTalla = this.db.object(`productos/${r.id}/talla/${idTalla}`);
      const productoData = await firstValueFrom(this.getProductoPorId(r.id));
      const nuevaCantidad = productoData.talla[r.talla.id].cantidad - r.talla.cantVenta;

      if (nuevaCantidad >= 0) {
        productoRefconTalla.update({ cantidad: nuevaCantidad });
      } else {
        console.error(`No hay suficiente stock para ${productoData.nombre}`);
      }
    }
  }
}