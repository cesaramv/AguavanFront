import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, timeout } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './../../models/auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private oauthService: OAuthService) { 
    this.configureWithNewConfigApi();
  }

  public setTokens(id_token, access_token){
    sessionStorage.setItem('id_token', id_token);
    sessionStorage.setItem('access_token', access_token);
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.initLoginFlow();
  }

  public configureWithNewConfigApi(): void{
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public get hasValidTokens(): boolean {
    return (
      this.oauthService.hasValidIdToken()&&
      this.oauthService.hasValidAccessToken()
    );
  }

  public validateSession(): Observable<boolean> {
    return this.hasValidTokens ? of(true) : this.checkServiceEvents();
  }

  public checkServiceEvents(): Observable<boolean> {
    return this.oauthService.events.pipe(
      timeout(1000),
      map((event: any) => event.type === 'token_received'),
      filter(event => !!event),
      catchError(() => of(false))
    );
  }
}
