import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    { path: 'inventario', loadChildren: () => import('../inventario/inventario.module').then(m => m.InventarioModule) },
    { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
