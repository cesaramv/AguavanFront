import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { GenericService } from './generic.service';

@Injectable()
export class MenuService extends GenericService<any> {

  constructor(readonly http: HttpClient) {
    super(http, `${environment.HOST}/menus`);
  }
}
