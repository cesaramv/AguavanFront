import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './department.component';
import { ListarDepartmentComponent } from './listar-department/listar-department.component';
import { NewDepartmentComponent } from './new-department/new-department.component';


const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent,
    children: [
      {
        path: '',
        component: ListarDepartmentComponent
      },
      {
        path: 'listar',
        component: ListarDepartmentComponent
      },
      {
        path: 'crear',
        component: NewDepartmentComponent
      },
      {
        path: ':id',
        component: NewDepartmentComponent
      }
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  /* { path: '**', component: NotFoundComponent } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
