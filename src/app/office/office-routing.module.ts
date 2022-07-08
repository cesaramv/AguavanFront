import { OrdersComponent } from './orders/orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedComponent } from './red/red.component';
import { OfficeComponent } from './office.component';
import { WalletComponent } from './wallet/wallet.component';


const routes: Routes = [
  {
    path: '',
    component: OfficeComponent,
    children: [
      {
        path: '',
        component: RedComponent
      },
      {
        path: 'red',
        component: RedComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'order',
        component: OrdersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
