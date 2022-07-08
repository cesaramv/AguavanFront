import { authInterceptorProviders } from './../core/interceptors/auth.interceptor';
//import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {TableModule} from 'primeng/table';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SharedModule } from '../shared/shared.module';
import { MaestrosModule } from './maestros/maestros.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    TableModule,
    FontAwesomeModule,
    SharedModule,
    MaestrosModule,
    //CoreModule
  ], 
  providers: [
    authInterceptorProviders
  ]
})
export class AdminModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
