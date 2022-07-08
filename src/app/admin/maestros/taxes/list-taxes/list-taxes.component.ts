import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';
import * as actionsTaxes from '../../../../store-redux/actions/taxes.actions';

import { AlertService } from '@core/services/alert.service';
import { TaxService } from '../../../../core/services';
import { ListTaxesConfig } from './list-taxes.config';

@Component({
  selector: 'app-list-taxes',
  templateUrl: './list-taxes.component.html',
  styleUrls: ['./list-taxes.component.css']
})
export class ListTaxesComponent implements OnInit, OnDestroy {

  configuracion: ListTaxesConfig = new ListTaxesConfig();
  subscription: Subscription[] = [];
  pageCuerrent: number = 1;

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly taxService: TaxService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('taxes').pipe(
        filter(data => !!data && !!this.configuracion.gridList.component),
        tap(this.handlerGrid.bind(this))
      ).subscribe()
    );
    this.getDatos();
  }

  private handlerGrid({ taxes, pagination }) {
    this.configuracion.gridList.component.limpliar();
    this.configuracion.gridList.component.cargarDatos(
      taxes, pagination
    );
  }

  private getDatos(page = 1, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, ...addParams };
    this.store.dispatch(actionsTaxes.loadTaxes({ filtros: params }));
  }

  clickCelda(event: any) {
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/impuestos/${event.row.uid}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.taxService.eliminar(event.row.uid).subscribe(resp => {
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

  clickPaginador(event) {
    this.pageCuerrent = event;
    this.getDatos(event);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }
}
