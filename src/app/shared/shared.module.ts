import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { NoAplicaPipe } from './pipes/no-aplica.pipe';


@NgModule({
  declarations: [CustomCurrencyPipe, NoAplicaPipe],
  imports: [
    CommonModule
  ],
  exports: [
    CustomCurrencyPipe,
    NoAplicaPipe
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        CurrencyPipe,
        //EmptyPipe,
        NoAplicaPipe,
        CustomCurrencyPipe
      ]
    }
  }
}
