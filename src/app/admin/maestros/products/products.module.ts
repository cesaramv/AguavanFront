import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewProductComponent } from './new-product/new-product.component';
import { HttpClientModule } from '@angular/common/http';
import {FileUploadModule} from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [ProductsComponent, ListProductsComponent, NewProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    DropdownModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
  ]
})
export class ProductsModule { }
