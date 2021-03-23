import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@core/guards/can-deactivate.guard';
import { ListStateOrdesComponent } from './list-state-ordes/list-state-ordes.component';
import { NewStateOrdersComponent } from './new-state-orders/new-state-orders.component';
import { StateOrdesComponent } from './state-ordes.component';


const routes: Routes = [
  {
    path: '',
    component: StateOrdesComponent,
    children: [
      {
        path: '',
        component: ListStateOrdesComponent
      },
      {
        path: 'listar',
        component: ListStateOrdesComponent
      },
      {
        path: 'crear',
        component: NewStateOrdersComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: NewStateOrdersComponent,
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
export class StateOrdesRoutingModule { }
