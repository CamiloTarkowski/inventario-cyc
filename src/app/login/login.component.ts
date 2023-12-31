import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  mostrarNavbar: boolean = false;
  email = "";
  password = "";
  
  constructor(private authService: AuthService){

  }

  iniciarSesion(){
    this.authService.login(this.email, this.password)

  }

  ngOnInit(): void{

  }
}
