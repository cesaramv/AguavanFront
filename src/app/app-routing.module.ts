import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TokenComponent } from './token/token.component';
import { RolesComponent } from './roles/roles.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Not403Component } from './not403/not403.component';
import { Not404Component } from './not404/not404.component';
import { StoreComponent } from './store/store.component';
import { GuardService } from './services/guard.service';
import { ValidarMenuGuardService } from './services/validar-menu-guard.service';

const routes: Routes = [
  /* {
    path: '',
    component: TokenComponent
  }, */
  {
    path: '',
    component: HomeComponent,
    //canActivate: [ValidarMenuGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [ValidarMenuGuardService]
  },
  {
    path: 'store',
    component: StoreComponent,
    //canActivate: [ValidarMenuGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'token',
    component: TokenComponent
  },
  {
    path: 'roles',
    component: RolesComponent, 
    canActivate: [GuardService]
  },
  {
    path: 'not-403',
    component: Not403Component
  },
  {
    path: 'not-404',
    component: Not404Component
  },
  {
    path: 'office',
    loadChildren: () => import('./office/office.module').then(m => m.OfficeModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  /* {
    path: '**',
    redirectTo: 'not-404',
    pathMatch: 'full'
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
