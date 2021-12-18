import { OrderDetailComponent } from './order-detail/order-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreComponent } from './store.component';
import { ProductsStoreComponent } from './products-store/products-store.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    children: [
      {
        path: '',
        component: ProductsStoreComponent
      },
      {
        path: 'order-detail',
        component: OrderDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
