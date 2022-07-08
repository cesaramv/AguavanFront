import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Security } from './security';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import * as utilsSecurity from './utils.security';

@Injectable({
  providedIn: 'root'
})
export class SecurityService extends Security {

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService
  ) {
    super();
  }

  public getBackendPublicKey(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${this.oauthService.getIdToken()}`,
      accesstoken: `${this.oauthService.getAccessToken()}`
    });
    return this.http.get(`${environment.HOST}/encrypt/getasymmetrickey`, {
      headers
    });
  }

  public getBackendSymmetrickey(body): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${this.oauthService.getIdToken()}`,
      accesstoken: `${this.oauthService.getAccessToken()}`
    });
    return this.http.post(`${environment.HOST}/encrypt/getsymmetrickey`,
      body,
      {
        headers
      }
    );
  }

  /* public hmac(input: string, backendSymmetrickey: BackendSymmetricKey): string {
    return utilsSecurity.hmac(input, backendSymmetrickey.hmackey);
  } */

  /* public forgeAesEncryptAndEncode(
    url: string,
    backendSymmetrickey: BackendSymmetricKey
  ): any {
    const [baseUrl, params] = url.split('?');
    const encodeUrl = !!params ? `${baseUrl}?${this.forgeAesEncryptAndEncodeParams(
      params,
      backendSymmetrickey
    )}`
      : url;
    return encodeUrl;
  } */
}
