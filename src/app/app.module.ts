import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReusableFormComponent } from './reusable-form/reusable-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { appReducers } from './store-redux/app.reducer'
import { EffectsArray } from './store-redux/effects/index';

import { ProfileFormComponent } from './profile-form/profile-form.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { TokenComponent } from './token/token.component';
import { TokenService } from './serices/token.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RolService } from './services/rol.service';
import { LoginService } from './services/login.service';
import { RolesComponent } from './roles/roles.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './services/menu.service';
import { ProductoService } from './services/producto.service';
import { FooterComponent } from './footer/footer.component';
import { from } from 'rxjs';
import { GuardService } from './services/guard.service';
import { ValidarMenuGuardService } from './services/validar-menu-guard.service';
import { Not403Component } from './not403/not403.component';
import { Not404Component } from './not404/not404.component';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { StoreComponent } from './store/store.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { far } from '@fortawesome/free-regular-svg-icons';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    ReusableFormComponent,
    ProfileFormComponent,
    PasswordFormComponent,
    TokenComponent,
    RolesComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    FooterComponent,
    Not403Component,
    Not404Component,
    StoreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot( appReducers ),
    EffectsModule.forRoot( EffectsArray ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    FontAwesomeModule,
    NgxUiLoaderModule.forRoot({
      bgsColor: '#0f117a',
      bgsOpacity: 1,
      bgsPosition: 'center-center',
      bgsSize: 50,
      bgsType: 'circle',
      minTime: 300,
      pbColor: '#FFF',
      fgsColor: '#0f117a',
      overlayColor: 'rgba(40,40,40,0.3)',
      fgsType: 'circle'
    }),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
    NgxUiLoaderRouterModule.forRoot({
      showForeground: true
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.HOST.substring(7)],
        disallowedRoutes: [`http://${environment.HOST.substring(7)}/login/enviarCorreo`],
      },
    }),
    SharedModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    GuardService, 
    MenuService, 
    LoginService, 
    TokenService, 
    RolService,
    ProductoService,
    ValidarMenuGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
