import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-add-colegio',
  templateUrl: './add-colegio.component.html',
  styleUrls: ['./add-colegio.component.css']
})
export class AddColegioComponent {

  constructor(private firebaseService: FirebaseService) { }

  agregarColegio(nombre: string, fullname: string) {
    // Añadir colegio  
    this.firebaseService.addColegio(nombre, fullname)
      .then()
     .catch(error => console.error('Error agregando:', error));
  }



  ngOnInit(): void {

  }

}
