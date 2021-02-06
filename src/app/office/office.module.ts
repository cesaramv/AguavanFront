import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficeRoutingModule } from './office-routing.module';
import { OfficeComponent } from './office.component';
import { RedComponent } from './red/red.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { WalletComponent } from './wallet/wallet.component';


@NgModule({
  declarations: [OfficeComponent, RedComponent, WalletComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    OfficeRoutingModule
  ]
})
export class OfficeModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
