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
    return this.db.list('productos').valueChanges();
  }
  
  getProductoPorId(id: number) {
    return this.db.object(`productos/${id}`).valueChanges();
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

  async addProduct(producto: any) {


    this.getColegios()
    .subscribe(data => {
      const productos = data;
      })

    console.log(productos);

    if (productos.some(p => p.name === producto.name)) {
      throw new Error('Producto ya existe'); 
    }
    
  
    const productRef = this.db.list('/products');
  
    return productRef.push(producto);
  
  }
}
