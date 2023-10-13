import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() mostrarNavbar: boolean = true;

  ruta!: string; 

  

  constructor(private authService: AuthService){
  }


  ngOnInit(){
    this.ruta = window.location.pathname;  
  }
    


  logout(){
    this.authService.logout();
  }

}
