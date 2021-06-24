import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { StateUserService } from '@core/services/state-user.service';

import { ListarStateUsersConfig } from './list-state-users.config';

@Component({
  selector: 'app-list-state-users',
  templateUrl: './list-state-users.component.html',
  styleUrls: ['./list-state-users.component.css']
})
export class ListStateUsersComponent implements OnInit {

  configuracion: ListarStateUsersConfig = new ListarStateUsersConfig();

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly stateUserService: StateUserService
  ) { }

  ngOnInit(): void {
    this.getDatos();
  }

  private getDatos(page = 0, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true };
    if (addParams) {
      params = { ...params, ...addParams };
    }
    this.stateUserService.listar(params).subscribe((datos: any) => {
      this.configuracion.gridList.component.cargarDatos(
        datos.content, {
          totalElements: datos.totalElements,
          number: datos.number,
          totalPages: datos.totalPages
        }
      );
    });
  }

  clickCelda(event: any){
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/estados_usuarios/${event.row.stateUserId}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.stateUserService.eliminar(event.row.stateUserId).subscribe(resp => {
              this.translate.get('global.eliminadoExitosoMensaje').subscribe(menssage => { 
                this.alertService.success(menssage).then(() => {
                  this.getDatos();
                });
              });
            });
          }
        });
      });
    }
  }

  clickPaginador(event){
    this.getDatos(event);
  }

}
