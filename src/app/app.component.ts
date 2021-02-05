import { Component, OnInit, ɵExtraLocaleDataIndex, ɵLocaleDataIndex } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from './services/menu.service';
import { LoginService } from './services/login.service';
import locale_esCO from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';

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
    private readonly loginService: LoginService
  ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    registerLocaleData(locale_esCO);

    const currencySymbols = locale_esCO[ɵLocaleDataIndex.Currencies];
    currencySymbols['USD'] = ['$', '$'];
    registerLocaleData(locale_esCO, 'en');
  }
  
  ngOnInit(): void {
    if(!this.loginService.estaLogueado()){
      this.menuService.listarPorIdRol().subscribe((resp: any) => {
        this.menuService.setMenuCambio(resp);
      });
    }
  }
}
