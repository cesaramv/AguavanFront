import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { NoAplicaPipe } from './pipes/no-aplica.pipe';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { GridComponent } from './components/grid/grid.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EmptyPipe } from './pipes/empty.pipe';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputSelectComponent } from './components/input-select/input-select.component';

@NgModule({
  declarations: [CustomCurrencyPipe, NoAplicaPipe, GridComponent, EmptyPipe, DatePickerComponent, InputSelectComponent],
  imports: [
    CommonModule,
    FormsModule, 
    TranslateModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    FontAwesomeModule
  ],
  exports: [
    CustomCurrencyPipe,
    TranslateModule,
    NoAplicaPipe,
    GridComponent,
    FontAwesomeModule,
    DatePickerComponent,
    InputSelectComponent
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
