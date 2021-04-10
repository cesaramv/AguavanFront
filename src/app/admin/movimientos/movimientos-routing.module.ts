import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimientosComponent } from './movimientos.component';


const routes: Routes = [
  {
    path: '',
    component: MovimientosComponent,
    children: [
      {
        path: '',
        redirectTo: 'ordenes',
        pathMatch: 'full' 
      },
      {
        path: 'ordenes',
        loadChildren: () => import('./orders/orders-routing.module').then(m => m.OrdersRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
