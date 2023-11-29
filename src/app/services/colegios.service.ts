import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColegiosService {

  constructor(private db: AngularFireDatabase,
    private router: Router) { }

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
        const data = snapshot.payload.val(); 
        const id = snapshot.payload.key; 
        return { id, ...data }; 
      })
   );  
  }

  async addColegio(col: any) {
    const colegios = await firstValueFrom(this.getColegios());
    if (colegios.some((c: any) => c.nombre === col.nombre)) {
      alert("Colegio que desea ingresar ya está registrado. ")
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
  }

  

  updateColegio(id: string, updatedColegio: any) {
    
    console.log("Colegio actualizado con éxito. ");
    this.router.navigate(['/colegios']);
    return this.db.object(`colegios/${id}`).update(updatedColegio);
  }
}
