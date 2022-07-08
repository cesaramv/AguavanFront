import { Component, OnInit, ɵExtraLocaleDataIndex, ɵLocaleDataIndex } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from './services/menu.service';
import { LoginService } from './services/login.service';
import locale_esCO from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from './store-redux/app.reducer';
import { loadAuth, loadMenus, loadRefreshAuth } from '../app/store-redux/actions/index'
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appaguavan';

  constructor(
    private readonly translate: TranslateService,
    private readonly menuService: MenuService,
    private readonly loginService: LoginService,
    private store: Store<AppState>
  ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    registerLocaleData(locale_esCO);

    const currencySymbols = locale_esCO[ɵLocaleDataIndex.Currencies];
    currencySymbols['USD'] = ['$', '$'];
    registerLocaleData(locale_esCO, 'en');
  }

  ngOnInit(): void {
    this.store.dispatch(loadRefreshAuth());
    /* if(!this.loginService.estaLogueado()){
      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
      const decodedToken = helper.decodeToken(token); */

    /* this.menuService.listar({}).subscribe((resp: any) => {
      this.menuService.setMenuCambio(resp);
    }); */
    //}
  }
}
