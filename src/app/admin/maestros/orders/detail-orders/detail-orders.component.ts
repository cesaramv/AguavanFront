import { loadOrderById, loadOrderByIdSuccess } from './../../../../store-redux/actions/order.actions';
import { AppState } from 'src/app/store-redux/app.reducer';
import { getOrderById, getOrderDetail } from './../../../../store-redux/selectors/order.selectors';
import { Observable, Subscription } from 'rxjs';
import { OrderService } from './../../../../core/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-detail-orders',
  templateUrl: './detail-orders.component.html',
  styleUrls: ['./detail-orders.component.css']
})
export class DetailOrdersComponent implements OnInit, OnDestroy {

  orderId: number;
  esCreacion: boolean;
  subscription:Subscription[];
  orderDetail: any;

  public orderDetail$: Observable<any>;

  constructor(
    private readonly activatedRouter: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) { 
    this.esCreacion = true;
  }
  ngOnDestroy(): void {
    this.store.dispatch(loadOrderByIdSuccess({order: null }));
  }

  ngOnInit(): void {
    debugger
    this.orderId = Number(this.activatedRouter.snapshot.paramMap.get('orderId'));
    if(!this.orderId){
      this.router.navigate([`/admin/maestros/ordenes`]);
    }
    this.orderDetail$ = this.store.select(getOrderDetail);
    this.orderDetail$.subscribe(async order => {
      if(!order){
        this.store.dispatch(loadOrderById({ filtros: this.orderId }))
      }
      
    }).unsubscribe();

    console.log(this.orderDetail);

    //.orderDetail$ = this.store.select(getProductDetailSelected);
    /* this.activatedRouter.params.subscribe(async params => {
      this.orderId = params.id || null;
      if(!!this.orderId){
        this.esCreacion = false;
        const rowOrder = await this.documentService.listarPorId(this.documentId).toPromise();
        this.formInit(rowCategory);
      } else {
        this.esCreacion = true;
        this.formInit();
      }
    }); */
  }

}
