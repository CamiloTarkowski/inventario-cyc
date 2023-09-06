import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from './inventario/inventario.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { ColegiosComponent } from './colegios/colegios.component';
import { VenderComponent } from './vender/vender.component';
import { AddColegioComponent } from './add-colegio/add-colegio.component';
import { AddProductoComponent } from './add-producto/add-producto.component';
import { EditProductoComponent } from './edit-producto/edit-producto.component';
import { EditColegioComponent } from './edit-colegio/edit-colegio.component';
import { ColegioComponent } from './colegio/colegio.component';

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
  },
  {
    path: 'add-colegio',
    component: AddColegioComponent
  },
  {
    path: 'add-producto/:id',
    component: AddProductoComponent
  },
  {
    path: 'edit-producto/:id',
    component: EditProductoComponent
  },
  {
    path: 'edit-colegio/:id',
    component: EditColegioComponent
  },
  {
    path: 'colegio',
    component: ColegioComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
