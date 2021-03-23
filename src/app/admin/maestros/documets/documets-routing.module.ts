import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '@core/guards/can-deactivate.guard';
import { DocumetsComponent } from './documets.component';
import { ListDocumentsComponent } from './list-documents/list-documents.component';
import { NewDocumetsComponent } from './new-documets/new-documets.component';


const routes: Routes = [
  {
    path: '',
    component: DocumetsComponent,
    children: [
      {
        path: '',
        component: ListDocumentsComponent
      },
      {
        path: 'listar',
        component: ListDocumentsComponent
      },
      {
        path: 'crear',
        component: NewDocumetsComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: NewDocumetsComponent,
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
export class DocumetsRoutingModule { }
