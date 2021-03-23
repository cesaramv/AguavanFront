import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { DepartmentsService } from '../../services/departments.service';
import { ListarDepartmentConfig } from './listar-department.config';

@Component({
  selector: 'app-listar-department',
  templateUrl: './listar-department.component.html',
  styleUrls: ['./listar-department.component.css']
})
export class ListarDepartmentComponent implements OnInit {

  listDepartment: any;
  configuracion: ListarDepartmentConfig = new ListarDepartmentConfig();

  constructor(
    private readonly router: Router,
    private readonly departmentsService: DepartmentsService,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getDepartmens();
  }

  async getDepartmens(page = 0, size = 10, addParams?: any) {
    let params = { page, size };
    if (addParams) {
      params = { ...params, ...addParams };
    }
    this.departmentsService.listar(params).subscribe((datos: any) => {
      this.listDepartment = datos.content;
      this.configuracion.gridList.component.cargarDatos(
        this.listDepartment, {
        totalElements: datos.totalElements,
        number: datos.number,
        totalPages: datos.totalPages
      }
      );
    });
  }

  clickCelda(event: any) {
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/departamentos/${event.row.departmentId}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.departmentsService.eliminar(event.row.departmentId).subscribe(resp => {
              this.translate.get('global.eliminadoExitosoMensaje').subscribe(menssage => { 
                this.alertService.success(menssage).then(() => {
                  this.getDepartmens();
                });
              });
            });
          }
        });
      });
    }
  }

  clickPaginador(event) {
    this.getDepartmens(event);
  }

}
