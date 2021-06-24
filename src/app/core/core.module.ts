import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { GenericService } from './services/generic.service';
import { 
  AlertService, ProductService, CalculationService, DepartmentsService,
  DocumentService, CityService, StateUserService
} from './services/index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ 
    AlertService,
    CanDeactivateGuard,
    GenericService,
    CalculationService,
    DepartmentsService,
    DocumentService,
    CityService,
    StateUserService,
    ProductService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You shall not run!');
    }
  }
 }
