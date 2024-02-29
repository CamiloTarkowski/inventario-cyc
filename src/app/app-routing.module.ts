import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from './inventario/inventario.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { ColegiosComponent } from './colegios/colegios.component';
import { VenderComponent } from './vender/vender.component';
import { EditProductoComponent } from './edit-producto/edit-producto.component';
import { ColegioComponent } from './colegio/colegio.component';
import { VentasComponent } from './ventas/ventas.component';
import { VentaComponent } from './venta/venta.component';
import { AllProductosComponent } from './all-productos/all-productos.component';
import { AddProductNoschoolComponent } from './add-product-noschool/add-product-noschool.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { MaterialComponent } from './material/material.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';



const routes: Routes = [
  {
    path: '',
    component:InicioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'inventario/:id',
    component: InventarioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'producto/:id',
    component:ProductoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'productos/:id',
    component:ProductosComponent,
    canActivate: [authGuard]
  },
  {
    path: 'colegios',
    component:ColegiosComponent,
    canActivate: [authGuard]
  },
  {
    path: 'vender',
    component: VenderComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit-producto/:id',
    component: EditProductoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'colegio',
    component: ColegioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'ventas',
    component: VentasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'venta/:id',
    component: VentaComponent,
    canActivate: [authGuard]
  },
  {
    path: 'all-productos',
    component: AllProductosComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add-product-noschool',
    component: AddProductNoschoolComponent,
    canActivate: [authGuard]
  },
  {
    path: 'material',
    component: MaterialComponent,
    canActivate: [authGuard]
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent,
    canActivate: [authGuard] 
  },
  {
    path: 'add-promotion',
    component: AddPromotionComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard]

  },  
  {
    path: '**',
    redirectTo: 'login',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
