import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {
   }

  getProductos(){
    return this.db.list('productos').valueChanges();
  }
  
  getProductoPorId(id: number) {
    return this.db.object(`productos/${id}`).valueChanges();
  }

  getColegios(){
    return this.db.list('colegios').valueChanges();
  }

  getColegioPorId(colegioId: number) {
    return this.db.object(`colegios/${colegioId}`).valueChanges();
  }

  async addColegio(nombre: string, fullname: string) {
    let colegios;
    let colegio = {
      nombre: nombre,
      fullname: fullname
    }
  
    this.getColegios()
      .subscribe(data => {
  
      colegios = data;
      
      if (colegios.some((c: any) => c.nombre === nombre)) {
        alert("El colegio que intenta agregar ya existe.");
        return;
      }
      else{
        const colegioRef = this.db.list('colegios');
        console.log("Colegio agregado exitosamente.")
        return colegioRef.push(colegio);
      }
  
    });
    
  }
}
