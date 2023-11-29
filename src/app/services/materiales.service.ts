import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  constructor(private db: AngularFireDatabase,
    private router: Router) { }
    getMateriales(): Observable<any[]> {
      return this.db.list('materiales').valueChanges();
    }
  
    getMaterial(id: string): Observable<any>{
      return this.db.list(`materiales/${id}`).valueChanges();
    }
  
    updateMaterial(id: string, material: any){
      return this.db.object(`materiales/${id}`).update(material);
    }
  
    async addMaterial(material: any){
      const materiales = await firstValueFrom(this.getMateriales());
      if(materiales.some((m: any) => m.nombre === material.nombre)){
        alert("Material ya se encuentra registrado.")
        return;
      }
      return this.db.list(`materiales`).push(material);
    }
}
