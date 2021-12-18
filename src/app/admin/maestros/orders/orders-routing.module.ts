import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrdersComponent } from './orders.component';
import { DetailOrdersComponent } from './detail-orders/detail-orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: '',
        component: ListOrdersComponent
      },
      {
        path: 'listar',
        component: ListOrdersComponent
      },
      {
        path: ':orderId',
        component: DetailOrdersComponent
      }
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
