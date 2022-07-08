import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, tap } from 'rxjs/operators';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';

import { OrderStateService } from '../../../../core/services/order-state.service';
import { ListStateOrdersConfig } from './list-state-orders.config';
import * as actionsOrderStates from '../../../../store-redux/actions/order-states.actions';

@Component({
  selector: 'app-list-state-ordes',
  templateUrl: './list-state-ordes.component.html',
  styleUrls: ['./list-state-ordes.component.css']
})
export class ListStateOrdesComponent implements OnInit, OnDestroy {

  configuracion: ListStateOrdersConfig = new ListStateOrdersConfig();
  subscription: Subscription[] = [];
  pageCuerrent: number = 1;

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly stateOrderService: OrderStateService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('orderStates').pipe(
        filter(data => !!data && !!this.configuracion.gridList.component),
        tap(this.handlerGrid.bind(this))
      ).subscribe()
    );
    this.getDatos();
  }

  private handlerGrid({ orderStates, pagination }) {
    this.configuracion.gridList.component.limpliar();
    this.configuracion.gridList.component.cargarDatos(
      orderStates, pagination
    );
  }

  private getDatos(page = 1, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, ...addParams };
    this.store.dispatch(actionsOrderStates.loadOrderStates({ filtros: params }));
  }

  clickCelda(event) {
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/estados_ordenes/${event.row.uid}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.stateOrderService.eliminar(event.row.uid).subscribe(resp => {
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
