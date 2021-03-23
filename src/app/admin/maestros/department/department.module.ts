import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { ListarDepartmentComponent } from './listar-department/listar-department.component';
import { NewDepartmentComponent } from './new-department/new-department.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DepartmentComponent, ListarDepartmentComponent, NewDepartmentComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DepartmentModule { }
