import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@core/guards/can-deactivate.guard';
import { ListTaxesComponent } from './list-taxes/list-taxes.component';
import { NewTaxesComponent } from './new-taxes/new-taxes.component';
import { TaxesComponent } from './taxes.component';


const routes: Routes = [
  {
    path: '',
    component: TaxesComponent,
    children: [
      {
        path: '',
        component: ListTaxesComponent
      },
      {
        path: 'listar',
        component: ListTaxesComponent
      },
      {
        path: 'crear',
        component: NewTaxesComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: NewTaxesComponent,
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
export class TaxesRoutingModule { }
