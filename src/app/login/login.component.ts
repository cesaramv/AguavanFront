import { ROLES } from './../shared/util/constantes/generales';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment';
import { MenuService } from '../services/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../store-redux/app.reducer';
import * as authActios from '../store-redux/actions/auth.actions';
import * as userActios from '../store-redux/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly translate: TranslateService,
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly menuService: MenuService,
    private readonly router: Router,
    private readonly _location: Location,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    if (this.loginService.estaLogueado()) {
      this._location.back();
      return;
    }
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  iniciarSesion() {
    const _form = this.form.getRawValue();
    this.loginService.login(_form.userName, _form.password).subscribe(resp => {
      // this.authenticationService.setTokens(id_token, access_token);
      console.log(resp);
      sessionStorage.setItem(environment.TOKEN_NAME, resp.token);
      if(resp && resp.user){
        const url = resp.user.role === ROLES.ADMIN ? '/admin/maestros' : '/office';
        this.router.navigate([url]);
      }
      //this.menuService.setMenuCambio(resp.menu);
      this.store.dispatch(authActios.loadAuthSuccess({ auth: resp }));
      /* this.store.dispatch(menuActios.loadMenusSuccess({ menus: resp.menu }));
      this.store.dispatch(userActios.loadUserSuccess({ user: resp.user})); */
      //this.router.navigate(['/office']);
      /* const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(resp.access_token);
      this.menuService.listarPorUserName(decodedToken.user_name).subscribe((menus: any) => {
        this.menuService.setMenuCambio(menus);
        this.router.navigate(['/office']);
      }); */
    });
  }

}
