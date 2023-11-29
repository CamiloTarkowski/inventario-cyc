import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private db: AngularFireDatabase,
    private router: Router) { }

  updateProducto(id: string, updatedProducto: any) {

    console.log("Producto actualizado con éxito. ");
    this.router.navigate(['productos/',updatedProducto.colegio.id]);
    return this.db.object(`productos/${id}`).update(updatedProducto);
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
       const data = snapshot.payload.val();
       const id = snapshot.payload.key; 
       return { id, ...data };  
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

  async addProducto(producto: any) {
    const productos = await firstValueFrom(this.getProductos());
    if (productos.some((p: any) => p.nombre === producto.nombre && p.colegio.nombre === producto.colegio.nombre)) {
      alert("Producto ya se encuentra registrado.")
      return;
    }
    const idColegio = producto.colegio.id;
    this.router.navigate(['/productos/'+idColegio]);
    return this.db.list(`productos`).push(producto);
  }

  getTallaDeProducto(idProducto: string, idTalla: number) {
    return this.db.object(`/productos/${idProducto}/talla/${idTalla}`).valueChanges();
  }
}
