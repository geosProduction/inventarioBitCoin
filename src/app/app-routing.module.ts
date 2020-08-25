import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes =
  [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
    { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'general', loadChildren: () => import('./components/general/general.module').then(m => m.GeneralModule) },
  { path: 'calculadora', loadChildren: () => import('./components/calculadora/calculadora.module').then(m => m.CalculadoraModule) },
  { path: 'mantenimiento', loadChildren: () => import('./components/mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule) },
  { path: 'reportes', loadChildren: () => import('./components/reportes/reportes.module').then(m => m.ReportesModule) },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
