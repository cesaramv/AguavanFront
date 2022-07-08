import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class CityService extends GenericService<any> {

  constructor(readonly http: HttpClient) {
    super(http, `${environment.HOST}/cities`);
  }
}
