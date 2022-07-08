import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeModule } from 'primeng/tree';

import { OfficeRoutingModule } from './office-routing.module';
import { OfficeComponent } from './office.component';
import { RedComponent } from './red/red.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { WalletComponent } from './wallet/wallet.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [OfficeComponent, RedComponent, WalletComponent, OrdersComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    OfficeRoutingModule,
    TreeModule,
    SharedModule
  ]
})
export class OfficeModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
