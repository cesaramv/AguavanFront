import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateUsersRoutingModule } from './state-users-routing.module';
import { StateUsersComponent } from './state-users.component';
import { ListStateUsersComponent } from './list-state-users/list-state-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewStateUsersComponent } from './new-state-users/new-state-users.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StateUsersComponent, ListStateUsersComponent, NewStateUsersComponent],
  imports: [
    CommonModule,
    StateUsersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StateUsersModule { }
