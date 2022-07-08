import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends GenericService<any> {

  constructor(readonly http: HttpClient) {
    super(http, `${environment.HOST}/categories`);
  }
}
