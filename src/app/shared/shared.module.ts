import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { NoAplicaPipe } from './pipes/no-aplica.pipe';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from './components/grid/grid.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EmptyPipe } from './pipes/empty.pipe';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormUserComponent } from './components/form-user/form-user.component';
import { OrderDetailTotalComponent } from './components/order-detail-total/order-detail-total.component';
import { CmPercentPipe } from './pipes/cm-percent/cm-percent.pipe';

@NgModule({
  declarations: [
    CustomCurrencyPipe, 
    NoAplicaPipe, 
    CmPercentPipe,
    GridComponent, 
    EmptyPipe, 
    DatePickerComponent, 
    FormUserComponent, 
    OrderDetailTotalComponent, CmPercentPipe
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    TranslateModule,
    TableModule,
    CalendarModule,
    DropdownModule,
    FontAwesomeModule
  ],
  exports: [
    CustomCurrencyPipe,
    CmPercentPipe,
    TranslateModule,
    NoAplicaPipe,
    GridComponent,
    FontAwesomeModule,
    DatePickerComponent,
    FormUserComponent,
    OrderDetailTotalComponent
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
        CustomCurrencyPipe,
        CmPercentPipe
      ]
    }
  }
}
