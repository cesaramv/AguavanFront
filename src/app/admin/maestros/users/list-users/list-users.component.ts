import { Component, OnDestroy, OnInit } from '@angular/core';

import { ListUsersConfig } from './list-users.config';
import { UsersService } from '../../../../services/users.service';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as usersAction from '../../../../store-redux/actions/index';
import { AppState } from 'src/app/store-redux/app.reducer';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  listUsers: any;
  configuracion: ListUsersConfig = new ListUsersConfig();
  loading: boolean = false;
  error: any;
  subscription: Subscription[] = [];
  pageCuerrent: number = 1;

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly usersService: UsersService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('users').pipe(
        filter(data => !!data && !!this.configuracion.gridList.component),
        tap(this.handlerGrid.bind(this))
      ).subscribe()
    );
    this.getUsers();
  }

  private handlerGrid({ users, pagination }) {
    this.configuracion.gridList.component.limpliar();
    this.configuracion.gridList.component.cargarDatos(
      users, pagination
    );
  }

  private getUsers(page = 1, size = 10, stateUser = 2, roles = 2, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, 'stateUser.stateUserId': stateUser, 'roles.idRol': roles };
    if (addParams) {
      params = { ...params, ...addParams };
    }
    this.store.dispatch(usersAction.loadUsers({ filtros: params }));
  }

  clickCelda(event) {
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/usuarios/${event.row.uid}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.usersService.eliminar(event.row.uid).subscribe(resp => {
              this.translate.get('global.eliminadoExitosoMensaje').subscribe(menssage => {
                this.alertService.success(menssage).then(() => {
                  this.getUsers(this.pageCuerrent);
                });
              });
            });
          }
        });
      });
    }
  }

  clickPaginador(event) {
    this.pageCuerrent = event;
    this.getUsers(event);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }

}
