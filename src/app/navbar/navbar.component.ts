import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  estaLogeado: boolean = false;

  

  constructor(private authService: AuthService){
    this.estaLogeado = authService.isLogged();
  }
  isLogged(){
    const observable = from(this.authService.isLogged());
    observable.subscribe(data => {
      this.estaLogeado = data;
      }
    )
  }

  ngOnInit(){
    this.isLogged();
    this.authService.auth.onAuthStateChanged().subscribe(user => {
      this.isAuthenticated = user !== null;
    });    
  }
    


  logout(){
    this.authService.logout();
  }

}
