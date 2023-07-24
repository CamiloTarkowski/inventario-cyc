import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  dataFromFirebase: any;

  constructor(private db: AngularFireDatabase) {

    const databaseRef = this.db.database.ref();

    databaseRef.child('datos').on('value', (snapshot) => {
      this.dataFromFirebase = snapshot.val();
    });

   }
}
