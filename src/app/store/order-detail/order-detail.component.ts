import { getProductDetailSelected, getProductLoadingSelected, getProductSelected } from './../../store-redux/selectors/order.selectors';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from './../../core/services/order.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';
import { OrderModel, OrderDetailModel } from './../../shared/models/order.model';
import * as actionsProductsSelected from '../../store-redux/actions/products-selected.actions';
import { DateUtil } from '@shared/util/date.util';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  public order$: Observable<any>;
  public orderDetail$: Observable<any>;
  //productsSelected: any;
  //order: OrderModel;
  //detail: OrderDetailModel;

  /* totalOrder: number;
  totalPoints: number;
  totalWeight: number;
  totalBaseGravada5: number;
  totalBaseGravada19: number;
  totalIva5: number;
  totalIva19: number;
  totalVExcento: number;
  totalVExcluido: number; */
  costTotal = (accumulator, currentValue) => accumulator + currentValue;
  //orderDetail: Observable<any>;

  constructor(
    private readonly router: Router,
    private readonly orderService: OrderService,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly store: Store<AppState>
  ) {
    /* this.productsSelected = [];
    this.totalOrder = 0;
    this.totalPoints = 0;
    this.totalWeight = 0;
    this.totalBaseGravada5 = 0;
    this.totalBaseGravada19 = 0;
    this.totalIva5 = 0;
    this.totalIva19 = 0;
    this.totalVExcento = 0;
    this.totalVExcluido = 0; */
  }

  ngOnInit(): void {
    //this.order$ = this.store.select('productsSelected');
    this.order$ = this.store.select(getProductSelected);
    this.orderDetail$ = this.store.select(getProductDetailSelected);
    this.store.select(getProductLoadingSelected).subscribe(resp => {
      if(resp){
        const _products = sessionStorage.getItem('products');
        if (_products) {
          const productsSession = JSON.parse(_products);
          if (productsSession.length <= 0) {
            this.router.navigate(['./store']);
            return;
          }
          this.store.dispatch(actionsProductsSelected.loadProductSelected({ product: productsSession }));
        } else {
          this.router.navigate(['./store']);
          return;
        }
      }
    })
   
    /* this.store.select(getProductSelected).subscribe(resp => {
      debugger
    }) */
    /* this.store.select('productsSelected').subscribe(item => {

      if (item.loading) {
        //Realizo un loader
        // No permitimos que continue ya que si esta en true es porque ya esta en proceso una solicitud
        return;
      } else if (item.products.length > 0) {
        this.asingValues(item);
        return;
      } else {
        const _products = sessionStorage.getItem('products');
        if (_products) {
          const productsSession = JSON.parse(_products);
          if (productsSession.length <= 0) {
            this.router.navigate(['./store']);
            return;
          }
          this.store.dispatch(actionsProductsSelected.loadProductSelected({ product: productsSession }));
        } else {
          this.router.navigate(['./store']);
          return;
        }
      }

      this.asingValues(item);
    }); */
  }

  private asingValues(item: any) {
    //this.productsSelected = item.products.length > 0 ? [...item.products].sort((a, b) => a.productId - b.productId) : [];
    //this.totalOrder = item.totalOrder || 0;
    //this.totalPoints = item.totalPoints || 0;
    //this.totalWeight = item.totalWeight || 0;
    //this.totalBaseGravada5 = item.totalBaseGravada5 || 0;
    //this.totalBaseGravada19 = item.totalBaseGravada19 || 0;
    //this.totalIva5 = item.totalIva5 || 0;
    //this.totalIva19 = item.totalIva19 || 0;
    //this.totalVExcento = item.totalValorExcento || 0;
    //this.totalVExcluido = item.totalValorExcluido || 0;

    /* this.order  = new OrderModel;

    this.order.users = 4;
    this.order.stateOrder = 1;
    this.order.fechaLimitePago = DateUtil.stringToDate('23-10-2021'); 
    this.order.formatPay = 1;
    this.order.valorEnvio = 100;
    this.order.red = 1500;
    this.order.valorConsignacion = 3000;
    this.order.subValor = item.totalOrder || 0;
    this.order.points = item.totalPoints || 0;
    this.order.weightTotal = item.totalWeight || 0;
    this.order.baseGravada5 = item.totalBaseGravada5 || 0;
    this.order.baseGravada19 = item.totalBaseGravada19 || 0;
    this.order.totalIva5 = item.totalIva5 || 0;
    this.order.totalIva19 = item.totalIva19 || 0;
    this.order.valorExcento = item.totalValorExcento || 0;
    this.order.valorExcluido = item.totalValorExcluido || 0;
    this.order.costo = item.products.map(x => x.cost * x.quantity).reduce(this.costTotal);  */

    /* if(item.products && item.products.length > 0){
      item.products.forEach(product => {
        this.detail = new OrderDetailModel;

        this.detail.product = product.productId;
        this.detail.cost = product.cost;
        this.detail.price = product.price;
        this.detail.points = product.points;
        this.detail.weightTotal = 1;
        this.detail.baseSaved5 = product.baseSave5;
        this.detail.baseSaved19 = product.baseSave19;
        this.detail.taxRate = product.tax.taxId;
        this.detail.totalIva5 = product.totalIva5;
        this.detail.totalIva19 = product.totalIva19;
        this.detail.vExcento = product.vExcento;
        this.detail.vExcluido = product.vExcluido;
        this.detail.quantity = product.quantity;
        this.detail.valorUnitarioDescuento = product.discountedUnitValue;
        this.detail.categoria = product.category.categoryId;
        this.detail.descuento = product.discount;
        this.detail.red = 100;

        this.order.orderDetail.push(this.detail);
      });
    } */

  }

  deleteProduct(product: any) {
    this.store.dispatch(actionsProductsSelected.removeProductSelected({ product }));
  }

  updateQuantityProduct(productUpdate: any, quantity: any) {
    const product = [{ ...productUpdate, quantity: +quantity }]
    this.store.dispatch(actionsProductsSelected.addProductSelected({ product }));
  }

  async saveOrder() {
    const order = await this.order$;
    const orderDetail: any = await this.orderDetail$;
    const params = {
      ...order,
      costo: orderDetail.map(x => x.cost * x.quantity).reduce(this.costTotal),
      users: 4,
      stateOrder: 1,
      fechaLimitePago: DateUtil.stringToDate('23-10-2021'), 
      formatPay: 1,
      valorEnvio: 100,
      red: 1500,
      valorConsignacion: 3000,
      detail: orderDetail
    }
    //const formOrder = this.form
    //console.log('order ->', this.order);
    this.orderService.crear(params).subscribe(resp => {debugger
      this.translate.get('global.guardadoExitosoMensaje').subscribe(mensaje => {
        this.alertService.success(mensaje).then(() => {
          //this.form.reset();
          //this.router.navigate(['/office/orders/123']);
        });
      });
    }, err => {
      this.translate.get('global.errorGuardar').subscribe(mensaje => {
        this.alertService.error(mensaje);
      });
    });
  }
}
