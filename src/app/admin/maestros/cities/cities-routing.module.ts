import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@core/guards/can-deactivate.guard';
import { CitiesComponent } from './cities.component';
import { ListCitiesComponent } from './list-cities/list-cities.component';
import { NewCityComponent } from './new-city/new-city.component';


const routes: Routes = [
  {
    path: '',
    component: CitiesComponent,
    children: [
      {
        path: '',
        component: ListCitiesComponent
      },
      {
        path: 'listar',
        component: ListCitiesComponent
      },
      {
        path: 'crear',
        component: NewCityComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: NewCityComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
