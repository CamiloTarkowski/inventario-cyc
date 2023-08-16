import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './producto/producto.component';
import { InicioComponent } from './inicio/inicio.component';
import { InventarioComponent } from './inventario/inventario.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import {CloudinaryModule} from '@cloudinary/ng';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductosComponent } from './productos/productos.component';
import { ColegiosComponent } from './colegios/colegios.component';
import { VenderComponent } from './vender/vender.component';
import { ColegioComponent } from './colegio/colegio.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    InicioComponent,
    InventarioComponent,
    NavbarComponent,
    ProductosComponent,
    ColegiosComponent,
    VenderComponent,
    ColegioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CloudinaryModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
