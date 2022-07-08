import { filter, tap } from 'rxjs/operators';
import { getUserSelector } from './../../store-redux/selectors/auth.selectors';
import { AppState } from './../../store-redux/app.reducer';
import { ListOrdersConfig } from './list-orders.config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as orderActions from '../../store-redux/actions/order.actions';
import { loadOrderByIdSuccess } from '../../store-redux/actions/order.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  configuracion: ListOrdersConfig = new ListOrdersConfig();
  user$: Observable<any>;
  uidUser: string;

  constructor(
    private readonly router: Router,
    //private readonly orderService: OrderService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('orders').pipe(filter(x => !!x)).subscribe((resp: any) => {
      if (this.configuracion.gridList.component) {
        this.configuracion.gridList.component.limpliar();
        this.configuracion.gridList.component.cargarDatos(
          this.rebuildObject(resp.orders), {
          totalElements: resp.totalElements,
          number: resp.number,
          totalPages: resp.totalPages
        }
        );
      }
    });
    /* this.user$ = this.store.select(getUserSelector).pipe(
      filter(x => !!x),
      tap(x => this.uidUser = x.uid),
      tap(() => this.getDatos()));
    
    this.user$.subscribe() */
    this.getDatos();
  }

  private rebuildObject(data: any) {
    return data.map(x => { return { ...x, _createdAt: x.createdAt.split('T')[0] } })
  }

  private getDatos(page = 0, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, user: this.uidUser, ...addParams };
    this.store.dispatch(orderActions.loadOrder({ filtros: params }));
  }

  clickCelda(event) {
    this.store.dispatch(loadOrderByIdSuccess({ order: event.row }));
    this.router.navigate([`/admin/maestros/ordenes/${event.row.orderId}`]);
  }

  clickPaginador(event) {
  }
}
