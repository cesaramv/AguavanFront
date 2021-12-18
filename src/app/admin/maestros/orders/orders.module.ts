import { DetailOrdersComponent } from './detail-orders/detail-orders.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';


@NgModule({
  declarations: [
    OrdersComponent,
    ListOrdersComponent,
    DetailOrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
