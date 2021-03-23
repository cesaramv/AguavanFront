import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesProductsComponent } from './categories-products.component';
import { ListCategoriesProductsComponent } from './list-categories-products/list-categories-products.component';
import { NewCategoriesProductsComponent } from './new-categories-products/new-categories-products.component';
import { CanDeactivateGuard } from '@core/guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: CategoriesProductsComponent,
    children: [
      {
        path: '',
        component: ListCategoriesProductsComponent
      },
      {
        path: 'listar',
        component: ListCategoriesProductsComponent
      },
      {
        path: 'crear',
        component: NewCategoriesProductsComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: NewCategoriesProductsComponent,
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
export class CategoriesProductsRoutingModule { }
