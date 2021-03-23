import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './services/alert.service';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { CalculationService } from './services/calculation.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ 
    AlertService,
    CanDeactivateGuard,
    CalculationService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You shall not run!');
    }
  }
 }
