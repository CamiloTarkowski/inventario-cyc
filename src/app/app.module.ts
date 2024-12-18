import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './producto/producto.component';
import { InicioComponent } from './inicio/inicio.component';
import { InventarioComponent } from './inventario/inventario.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductosComponent } from './productos/productos.component';
import { ColegiosComponent } from './colegios/colegios.component';
import { VenderComponent } from './vender/vender.component';
import { ColegioComponent } from './colegio/colegio.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AddColegioComponent } from './add-colegio/add-colegio.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { EditProductoComponent } from './edit-producto/edit-producto.component';
import { ResumenVentaComponent } from './resumen-venta/resumen-venta.component';
import { VentasComponent } from './ventas/ventas.component';
import { PesoChilenoPipe } from './pipes/peso-chileno.pipe';
import { VentaComponent } from './venta/venta.component';
import { AllProductosComponent } from './all-productos/all-productos.component';
import { AddProductNoschoolComponent } from './add-product-noschool/add-product-noschool.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MaterialComponent } from './material/material.component';
import { AddMaterialComponent } from './add-material/add-material.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { AddProveedorComponent } from './add-proveedor/add-proveedor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColegiosInicioComponent } from './colegios-inicio/colegios-inicio.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { EmisionComponent } from './emision/emision.component';



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
    ColegioComponent,
    LoginComponent,
    AddColegioComponent,
    EditProductoComponent,
    ResumenVentaComponent,
    VentasComponent,
    PesoChilenoPipe,
    VentaComponent,
    AllProductosComponent,
    AddProductNoschoolComponent,
    NotfoundComponent,
    MaterialComponent,
    AddMaterialComponent,
    ProveedoresComponent,
    AddProveedorComponent,
    ColegiosInicioComponent,
    AddPromotionComponent,
    EmisionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
