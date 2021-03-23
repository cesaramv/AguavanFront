import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateUsersComponent } from './state-users.component';
import { ListStateUsersComponent } from './list-state-users/list-state-users.component';
import { CanDeactivateGuard } from '@core/guards/can-deactivate.guard';
import { NewStateUsersComponent } from './new-state-users/new-state-users.component';


const routes: Routes = [
  {
    path: '',
    component: StateUsersComponent,
    children: [
      {
        path: '',
        component: ListStateUsersComponent
      },
      {
        path: 'listar',
        component: ListStateUsersComponent
      },
      {
        path: 'crear',
        component: NewStateUsersComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: NewStateUsersComponent,
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
export class StateUsersRoutingModule { }
