import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from './inventario/inventario.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { ColegiosComponent } from './colegios/colegios.component';
import { VenderComponent } from './vender/vender.component';

const routes: Routes = [
  {
    path: '',
    component:InicioComponent,
  },
  {
    path: 'inventario/:id',
    component: InventarioComponent,
  },
  {
    path: 'producto/:id',
    component:ProductoComponent,
  },
  {
    path: 'productos/:id',
    component:ProductosComponent
  },
  {
    path: 'colegios',
    component:ColegiosComponent
  },
  {
    path: 'vender',
    component: VenderComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
