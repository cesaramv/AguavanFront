import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'maestros',
        loadChildren: () => import('./maestros/maestros.module').then(m => m.MaestrosModule)
      },
      {
        path: 'movimientos',
        loadChildren:() => import('./movimientos/movimientos.module').then(m => m.MovimientosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }