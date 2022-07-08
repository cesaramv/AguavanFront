import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

@Injectable()
export class DepartmentsService extends GenericService<any> {

  constructor(readonly http: HttpClient) { 
    super(http, `${environment.HOST}/departments`);
  }
}
