import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  colegios$! : Observable<any[]>;


  constructor(private db : FirebaseService) { }

  ngOnInit(): void {

    this.colegios$ = this.db.getColegios();


  }

}
