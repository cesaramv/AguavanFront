import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {TableModule} from 'primeng/table';
import {UsersService} from '../services/users.service'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from '../shared/shared.module';
import { MaestrosModule } from './maestros/maestros.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    FontAwesomeModule,
    SharedModule,
    MaestrosModule
  ], 
  providers: [UsersService]
})
export class AdminModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
