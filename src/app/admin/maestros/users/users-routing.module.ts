import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersComponent } from './users.component';
import { CanDeactivateGuard } from '@core/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: ListUsersComponent
      },
      {
        path: 'listar',
        component: ListUsersComponent
      },
      {
        path: 'crear',
        component: NewUserComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: NewUserComponent,
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
