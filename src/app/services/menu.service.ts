import { Injectable } from '@angular/core';
import { GenericService } from '../core/services/generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericService<any> {

  private urlCotenidoPublico = `${environment.HOST}`;
  //private urlMenu = `${environment.HOST}/menus`;
  private menuCambio = new Subject<any[]>();

  constructor(readonly http: HttpClient) {
    super(http, `${environment.HOST}/menus`);
  }

  listarPorUserName(userName: string){
    return this.http.post(`${this.url}/usuario`, userName)
  }

  /* listarPorIdRol(){
    return this.http.get(`${this.url}`)
  } */

  getMenuCambio(): Observable<any> {
    return this.menuCambio.asObservable();
  }

  setMenuCambio(menus: any[]) {
    this.menuCambio.next(menus);
  }
}
