import { Component, OnInit } from '@angular/core';

import { ListUsersConfig } from './list-users.config';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  listUsers: any;
  configuracion: ListUsersConfig = new ListUsersConfig();

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(page = 0, size = 10, stateUser = 2, roles = 2, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, 'stateUser.stateUserId': stateUser, 'roles.idRol': roles };
    if (addParams) {
      params = { ...params, ...addParams };
    }
    this.usersService.listar(params).subscribe((users: any) => {
      this.listUsers = users.content.map(x => { 
        return { 
          ...x,
          email: x.email.toLowerCase(),
          nameFull: (x.firstName + ' ' + x.lastName).toLowerCase() 
        } 
      });

      this.configuracion.gridList.component.cargarDatos(
        this.listUsers, {
          totalElements: users.totalElements,
          number: users.number,
          totalPages: users.totalPages
        }
      );
    });
  }

  clickCelda(event){
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

  clickPaginador(event){
    this.getUsers(event);
  }

}
