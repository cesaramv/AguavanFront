import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

@Injectable()
export class ProductService extends GenericService<any> {

  private urlCotenidoPublico = `${environment.HOST}/contenido_publico`;

  constructor(readonly http: HttpClient) {
    super(http, `${environment.HOST}/productos`);
  }

  listarProductos(): Observable<any>{
    return this.http.get(`${this.urlCotenidoPublico}/productos`)
  }
}
