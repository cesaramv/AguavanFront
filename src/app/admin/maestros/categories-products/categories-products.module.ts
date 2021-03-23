import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesProductsRoutingModule } from './categories-products-routing.module';
import { CategoriesProductsComponent } from './categories-products.component';
import { ListCategoriesProductsComponent } from './list-categories-products/list-categories-products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewCategoriesProductsComponent } from './new-categories-products/new-categories-products.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CategoriesProductsComponent, ListCategoriesProductsComponent, NewCategoriesProductsComponent],
  imports: [
    CommonModule,
    CategoriesProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CategoriesProductsModule { }
