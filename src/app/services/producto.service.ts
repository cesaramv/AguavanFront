import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<any> {

  private urlCotenidoPublico = `${environment.HOST}/contenido_publico`;

  constructor(readonly http: HttpClient) {
    super(http, `${environment.HOST}/productos`);
  }

  listarProductos(): Observable<any>{
    return this.http.get(`${this.urlCotenidoPublico}/productos`)
  }
}
