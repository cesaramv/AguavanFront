import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from '../core/services/generic.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends GenericService<any> {

  constructor(readonly http: HttpClient) { 
    super(http, `${environment.HOST}/usuarios`);
  }

  getUserByUsername(username: string): Observable<any>{
    return this.http.get(`${this.url}/username/${username}`);
  }
}
