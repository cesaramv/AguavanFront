import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { NoAplicaPipe } from './pipes/no-aplica.pipe';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomCurrencyPipe, NoAplicaPipe],
  imports: [
    CommonModule,
    FormsModule, 
    FontAwesomeModule
  ],
  exports: [
    CustomCurrencyPipe,
    NoAplicaPipe
  ]
})
export class SharedModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCoffee);
  }

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
