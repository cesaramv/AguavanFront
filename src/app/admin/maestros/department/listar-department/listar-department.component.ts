import { pagination } from './../../../../store-redux/models/pagination';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';
import * as actionsDepartments from '../../../../store-redux/actions/departments.actions';

import { DepartmentsService, AlertService } from '@core/services';
import { ListarDepartmentConfig } from './listar-department.config';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-listar-department',
  templateUrl: './listar-department.component.html',
  styleUrls: ['./listar-department.component.css']
})
export class ListarDepartmentComponent implements OnInit, OnDestroy {

  listDepartment: any;
  configuracion: ListarDepartmentConfig = new ListarDepartmentConfig();
  subscription: Subscription[] = [];
  pageCuerrent: number = 1;
  //matrix = 3;
  constructor(
    private readonly router: Router,
    private readonly departmentsService: DepartmentsService,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('departments').pipe(
        filter(data => !!data && !!this.configuracion.gridList.component),
        tap(this.handlerGrid.bind(this))
      ).subscribe()
    );
    this.getDepartmens();
  }

  private handlerGrid({ departments, pagination }) {
    this.configuracion.gridList.component.limpliar();
    this.configuracion.gridList.component.cargarDatos(
      departments, pagination
    );
  }

  async getDepartmens(page = 1, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, ...addParams };
    this.store.dispatch(actionsDepartments.loadDepartments({ filtros: params }));
  }

  clickCelda(event: any) {
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/departamentos/${event.row.uid}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            // this.store.dispatch(actionsDepartments.deleteDepartment({code: event.row.departmentId}));
            this.departmentsService.eliminar(event.row.uid).subscribe(resp => {
              this.translate.get('global.eliminadoExitosoMensaje').subscribe(menssage => {
                this.alertService.success(menssage).then(() => this.getDepartmens(this.pageCuerrent));
              });
            });
          }
        });
      });
    }
  }

  clickPaginador(event) {
    this.pageCuerrent = event;
    this.getDepartmens(event);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }

}
