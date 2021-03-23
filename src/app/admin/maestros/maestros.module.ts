import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { MaestrosRoutingModule } from './maestros-routing.module';
import { MaestrosComponent } from './maestros.component';

import { DepartmentModule } from './department/department.module';
import { CitiesModule } from './cities/cities.module';
import { DocumetsModule } from './documets/documets.module';
import { UsersModule } from './users/users.module';
import { StateUsersModule } from './state-users/state-users.module';
import { CategoriesProductsModule } from './categories-products/categories-products.module';
import { ProductsModule } from './products/products.module';
import { StateOrdesModule } from './state-ordes/state-ordes.module';
import { TaxesModule } from './taxes/taxes.module';

import { DepartmentsService } from './services/departments.service';
import { CityService } from './services/city.service';
import { DocumentService } from './services/document.service';
import { StateUserService } from './services/state-user.service';
import { StateOrderService } from './services/state-order.service';
import { TaxService } from './services/tax.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { from } from 'rxjs';

@NgModule({
  declarations: [MaestrosComponent],
  imports: [
    CommonModule,
    MaestrosRoutingModule,
    SharedModule,
    DepartmentModule,
    CitiesModule,
    DocumetsModule,
    StateUsersModule,
    UsersModule,
    CategoriesProductsModule,
    ProductsModule,
    StateOrdesModule,
    TaxesModule
  ],
  providers: [
    DepartmentsService,
    CityService, 
    DocumentService,
    StateUserService,
    StateOrderService,
    TaxService,
    CategoryService,
    ProductService
  ]
})
export class MaestrosModule { }
