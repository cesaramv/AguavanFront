import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateUserService extends GenericService<any> {

  constructor(readonly http: HttpClient) {
    super(http, `${environment.HOST}/user-states`);
  }
}
