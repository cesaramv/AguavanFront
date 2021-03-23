import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes.component';
import { ListTaxesComponent } from './list-taxes/list-taxes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewTaxesComponent } from './new-taxes/new-taxes.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TaxesComponent, ListTaxesComponent, NewTaxesComponent],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TaxesModule { }
