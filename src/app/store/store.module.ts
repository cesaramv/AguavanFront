import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { ProductsStoreComponent } from './products-store/products-store.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StepsToBuyComponent } from './steps-to-buy/steps-to-buy.component';


@NgModule({
  declarations: [
    StoreComponent,
    ProductsStoreComponent,
    OrderDetailComponent,
    ProductDetailComponent,
    StepsToBuyComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule
  ]
})
export class StoreModule { }
