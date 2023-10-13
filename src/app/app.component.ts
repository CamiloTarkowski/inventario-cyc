import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventario-cyc';

  /* constructor(private authService: AuthService){  }

  async isLogged(){
    const logeado = await this.authService.isLogged();
    return logeado;
  } */

}
