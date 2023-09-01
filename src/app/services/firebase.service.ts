import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';




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
  
  getProductoPorId(id: string) {
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
      return ref.orderByChild('colegio/id').equalTo(colegioId) 
    })
    .valueChanges();
  
  }

  getTallasByProducto(productoId: string) {
    return this.db.object(`/productos/${productoId}`).valueChanges(); 
  }

  async addColegio(nombre: string, fullname: string) {
    let colegios: any;

    this.getColegios()
      .subscribe(data => {  
        colegios = data;
        if (colegios.some((c: any) => c.nombre === nombre)) {
          return;
        }
        else{
          const colegioRef = this.db.list('colegios');
          const colegio = {
            nombre: nombre,
            fullname: fullname,
          }
          this.router.navigate(['/colegios']);
          
          return colegioRef.push(colegio);
          
        }
    
      });
    
  }

  async addProducto(producto: any) {
    let productos: any;

    this.getProductos()
      .subscribe(data => {
        productos = data;
        if (productos.some((p: any) => p.nombre === producto.nombre)) {
          console.log("Producto ya existe.");
         return;
       }
       const productRef = this.db.list('/productos');
       console.log("Producto agregado correctamente.")
       return productRef.push(producto);
       })
  }

  getTallaDeProducto(idProducto: string, idTalla: number){
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
    return this.db.object(`productos/${id}`)
      .update(updatedProducto);
 }
}
