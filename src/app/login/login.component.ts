import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment';
import { MenuService } from '../services/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
    private readonly _location: Location
  ) { }

  ngOnInit(): void {
    if(this.loginService.estaLogueado()){
      this._location.back();
      return;
    }
    this.initForm();
  }

  private initForm(){
    this.form = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  iniciarSesion(){
    const _form = this.form.getRawValue();
    this.loginService.login(_form.userName, _form.password).subscribe(resp => {
      console.log(resp);
      sessionStorage.setItem(environment.TOKEN_NAME, resp.access_token);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(resp.access_token);
      this.menuService.listarPorUserName(decodedToken.user_name).subscribe((menus: any) => {
        this.menuService.setMenuCambio(menus);
        this.router.navigate(['/office']);
      });
    });
  }

}
