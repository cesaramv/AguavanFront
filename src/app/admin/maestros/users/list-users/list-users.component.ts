import { Component, OnInit } from '@angular/core';

import { ListUsersConfig } from './list-users.config';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  listUsers: any;
  configuracion: ListUsersConfig = new ListUsersConfig();

  constructor(private readonly usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(page = 0, size = 10, stateUser = 2, roles = 2, addParams?: any) {
    let params = { page, size, 'stateUser.stateUserId': stateUser, 'roles.idRol': roles };
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
    debugger
  }

  clickPaginador(event){
    debugger
    this.getUsers(event);
  }

}
