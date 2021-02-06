import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarMenuGuardService implements CanActivate {

  constructor(
    private readonly loginService: LoginService,
    private readonly menuService: MenuService,
    private readonly router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //1) VERIFICAR SI ESTA LOGUEADO
    const aaa = this.loginService.estaLogueado();
    if (this.loginService.estaLogueado()) {
      this.loginService.cerrarSesion(state.url);
      return false;
    } else {
      return true;
    }
  }
}
