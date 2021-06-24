import { Component, OnInit } from '@angular/core';

import { ListUsersConfig } from './list-users.config';
import { UsersService } from '../../../../services/users.service';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as usersAction from '../../../../store-redux/actions/index';
import { AppState } from 'src/app/store-redux/app.reducer';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  listUsers: any;
  configuracion: ListUsersConfig = new ListUsersConfig();
  loading: boolean = false;
  error: any;

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly usersService: UsersService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('users').subscribe(({users, loading, error, totalElements, number, totalPages}) => {
      //this.listUsers = users;
      this.listUsers = users;
      this.loading = loading;
      this.error = error;
      if(this.configuracion.gridList.component){
        this.configuracion.gridList.component.limpliar();

        this.configuracion.gridList.component.cargarDatos(
          this.listUsers, {
            totalElements,
            number,
            totalPages
          }
        );
      }
    })
    this.getUsers();
  }

  private getUsers(page = 0, size = 10, stateUser = 2, roles = 2, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, 'stateUser.stateUserId': stateUser, 'roles.idRol': roles };
    if (addParams) {
      params = { ...params, ...addParams };
    }
    this.store.dispatch(usersAction.loadUsers({ filtros: params }));
    /* this.usersService.listar(params).subscribe((users: any) => {
      //this.listUsers = users.content.map(x => { 
      const _data = users.content.map(x => {
        return { 
          ...x,
          email: x.email.toLowerCase(),
          nameFull: (x.firstName + ' ' + x.lastName).toLowerCase() 
        } 
      });

      this.store.dispatch(usersAction.loadUsersSuccess({users: _data}));

      this.configuracion.gridList.component.cargarDatos(
        this.listUsers, {
          totalElements: users.totalElements,
          number: users.number,
          totalPages: users.totalPages
        }
      );
    }); */
  }

  clickCelda(event) {
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/usuarios/${event.row.userId}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.usersService.eliminar(event.row.taxId).subscribe(resp => {
              this.translate.get('global.eliminadoExitosoMensaje').subscribe(menssage => {
                this.alertService.success(menssage).then(() => {
                  this.getUsers();
                });
              });
            });
          }
        });
      });
    }
  }

  clickPaginador(event) {
    this.getUsers(event);
  }

}
