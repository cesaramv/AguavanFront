import { OrderService } from './../../../../core/services/order.service';
import { AlertService } from '@core/services/alert.service';
import { ListOrdersConfig } from './list-orders.config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store-redux/app.reducer';
import * as orderActions from '../../../../store-redux/actions/order.actions'; 
import { loadOrderByIdSuccess } from '../../../../store-redux/actions/order.actions';

@Component({
  selector: 'app-orders-list',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {

  configuracion: ListOrdersConfig = new ListOrdersConfig();

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly orderService: OrderService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('orders').subscribe((resp : any) => {
      if(this.configuracion.gridList.component){
        this.configuracion.gridList.component.limpliar();
        this.configuracion.gridList.component.cargarDatos(
          resp.orders, {
            totalElements: resp.totalElements,
            number: resp.number,
            totalPages: resp.totalPages
          }
        );
      }
    });
    this.getDatos();
  }

  private getDatos(page = 0, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, ...addParams };
    this.store.dispatch(orderActions.loadOrder({filtros: params}));
  }

  clickCelda(event){
    if (event.tipeAccion === 'detalle') {
      this.store.dispatch(loadOrderByIdSuccess({order: event.row }));
      this.router.navigate([`/admin/maestros/ordenes/${event.row.orderId}`]);
    } else if(event.tipeAccion === 'editar'){
      this.router.navigate([`/admin/maestros/ordenes/${event.row.orderId}`]);
    }else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            
          }
        });
      });
    }
  }

  clickPaginador(event){
  }

}
