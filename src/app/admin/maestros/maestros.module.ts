import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriesProductsModule } from './categories-products/categories-products.module';
import { CitiesModule } from './cities/cities.module';
import { DepartmentModule } from './department/department.module';
import { DocumetsModule } from './documets/documets.module';
import { MaestrosRoutingModule } from './maestros-routing.module';
import { ProductsModule } from './products/products.module';
import { StateOrdesModule } from './state-ordes/state-ordes.module';
import { StateUsersModule } from './state-users/state-users.module';
import { TaxesModule } from './taxes/taxes.module';
import { UsersModule } from './users/users.module';

import { MaestrosComponent } from './maestros.component';

import { HttpClientModule } from '@angular/common/http';
//import { ProductService } from '../../core/services/product.service';

@NgModule({
  declarations: [MaestrosComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaestrosRoutingModule,
    SharedModule,
    CategoriesProductsModule,
    CitiesModule,
    DepartmentModule,
    DocumetsModule,
    StateUsersModule,
    ProductsModule,
    StateOrdesModule,
    StateUsersModule,
    TaxesModule,
    UsersModule,
  ],
  providers: [ ]
})
export class MaestrosModule { }
