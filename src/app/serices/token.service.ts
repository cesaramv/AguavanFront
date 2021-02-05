import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  datosBody: any = {};

  constructor(private readonly http: HttpClient) { }

  getToken(): Observable<any>{
    const jsonHeaders = { 
      Authorization: environment.Authorization,
      'Content-Type': environment["Content-Type"]
    };

    const httpOptions = {
      headers: new HttpHeaders(jsonHeaders)
    };

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('grant_type', environment.grant_type);
    urlSearchParams.set('username', environment.username);
    urlSearchParams.set('password', environment.password);
    urlSearchParams.set('scope', environment.scope);
    urlSearchParams.set('Content-Type', environment["Content-Type"]);
    
    let body = urlSearchParams.toString();

    const url = `/connect/token`;
    const resp = this.http.post(url, body, httpOptions);
    return resp;
  }

}
