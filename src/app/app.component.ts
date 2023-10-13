import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventario-cyc';
  mostrarNavbar: boolean = false;

  /* constructor(private authService: AuthService){  }

  async isLogged(){
    const logeado = await this.authService.isLogged();
    return logeado;
  } */

}
