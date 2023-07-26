import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(private db: AngularFireDatabase) { }

  getProductos(){
    return this.db.list('productos').valueChanges();
  }
  
  getProductoPorId(id: number): Observable<any> {
    return this.db.object(`productos/${id}`).valueChanges();
  }

  getColegios(){
    return this.db.list('colegios').valueChanges();
  }

  getColegioPorId(colegioId: number): Observable<any> {
    return this.db.object(`colegios/${colegioId}`).valueChanges();
  }
}
