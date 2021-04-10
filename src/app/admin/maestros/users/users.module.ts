import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersComponent } from './users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [UsersComponent, ListUsersComponent, NewUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    DropdownModule,
    ReactiveFormsModule,
    CalendarModule,
  ]
})
export class UsersModule { }
