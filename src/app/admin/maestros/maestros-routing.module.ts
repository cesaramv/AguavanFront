import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaestrosComponent } from './maestros.component';


const routes: Routes = [
  {
    path: '',
    component: MaestrosComponent,
    children: [
      {
        path: '',
        redirectTo: 'departamentos',
        pathMatch: 'full'
      },
      {
        path: 'departamentos',
        loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule)
      },
      {
        path: 'ciudades',
        loadChildren: () => import('./cities/cities.module').then(m => m.CitiesModule)
      },
      {
        path: 'documentos',
        loadChildren: () => import('./documets/documets.module').then(m => m.DocumetsModule)
      },
      {
        path: 'estados_usuarios',
        loadChildren: () => import('./state-users/state-users.module').then(m => m.StateUsersModule)
      },
      {
        path: 'estados_ordenes',
        loadChildren: () => import('./state-ordes/state-ordes.module').then(m => m.StateOrdesModule)
      },
      {
        path: 'categorias_productos',
        loadChildren: () => import('./categories-products/categories-products.module').then(m => m.CategoriesProductsModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'impuestos',
        loadChildren: () => import('./taxes/taxes.module').then(m => m.TaxesModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaestrosRoutingModule { }
