import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private db: AngularFireDatabase,
    private router: Router) { }

    getProveedores(): Observable<any>{
      return this.db.list(`proveedores`).valueChanges();
    }
  
    getProveedor(id: string){
      return this.db.object(`proveedores/${id}`).valueChanges();
    }
  
    updateProveedor(id: string, proveedor: any){
      return this.db.object(`proveedores/${id}`).update(proveedor);
    }
  
    async addProveedor(proveedor: any){
      const proveedores = await firstValueFrom(this.getProveedores());
      if (proveedores.some((p: any) => p.nombre === proveedor.nombre)) {
        console.log("Proveedor ya se encuentra registrado.");
        return;
      }
      return this.db.list(`proveedores`).push(proveedor);
  
    }
}
