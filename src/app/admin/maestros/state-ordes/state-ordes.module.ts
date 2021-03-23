import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateOrdesRoutingModule } from './state-ordes-routing.module';
import { StateOrdesComponent } from './state-ordes.component';
import { ListStateOrdesComponent } from './list-state-ordes/list-state-ordes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewStateOrdersComponent } from './new-state-orders/new-state-orders.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StateOrdesComponent, ListStateOrdesComponent, NewStateOrdersComponent],
  imports: [
    CommonModule,
    StateOrdesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StateOrdesModule { }
