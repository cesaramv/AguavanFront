import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  private url = `${environment.HOST}/auth`;

  constructor(readonly http: HttpClient) { }

  postAuth(params: any): Observable<any> {
    return this.http.post(`${this.url}/login`, params);
  }

  postAuthResfresh(): Observable<any> {
    return this.http.post(`${this.url}/refresh_token`, {});
  }
}
