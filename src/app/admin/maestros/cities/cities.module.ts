import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { CitiesComponent } from './cities.component';
import { ListCitiesComponent } from './list-cities/list-cities.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewCityComponent } from './new-city/new-city.component';

import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CitiesComponent, ListCitiesComponent, NewCityComponent],
  imports: [
    CommonModule,
    SharedModule,
    DropdownModule,
    CitiesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CitiesModule { }
