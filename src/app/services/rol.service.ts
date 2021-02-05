import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class RolService extends GenericService<any> {

  //private url: string = `${environment.HOST}/roles`;

  constructor(readonly http: HttpClient) {
    super(http, `${environment.HOST}/roles`);
  }
}
