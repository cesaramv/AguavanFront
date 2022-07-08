// import { AuthenticationService } from './services/authentication/authentication.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { GenericService } from './services/generic.service';
import { 
  AlertService, ProductService, CalculationService, DepartmentsService,
  DocumentService, CityService, StateUserService, MenuService, AuthService,
  OrderService, OrderStateService, TaxService, ProductCategoryService
} from './services/index';
// import { OAuthModule } from 'angular-oauth2-oidc';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //OAuthModule.forRoot()
  ],
  providers: [ 
    AlertService,
    AuthService,
    CanDeactivateGuard,
    CalculationService,
    CityService,
    DepartmentsService,
    DocumentService,
    GenericService,
    MenuService,
    OrderStateService,
    OrderService,
    ProductCategoryService,
    ProductService,
    StateUserService,
    TaxService,
    // AuthenticationService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You shall not run!');
    }
  }
 }
