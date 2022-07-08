import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';
import * as actionsPatrocinador from '../../store-redux/actions/patrocinador.actions';
import { getProductByUid } from 'src/app/store-redux/selectors/order.selectors';
import { filter } from 'rxjs/operators';
import * as actionsProducts from '../../store-redux/actions/products.actions';
import * as actionsProductsSelected from '../../store-redux/actions/products-selected.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  userId: string;
  product: any;
  product$: Observable<any>;
  id: string;

  constructor(
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRouter.snapshot.params.patrocinador_id;
    const { uid } = this.activatedRouter.snapshot.params;
    this.id = uid;
    this.product$ = this.store.select(getProductByUid, uid);

    this.store.select(getProductByUid, uid).subscribe(this.handleProduct.bind(this))

    console.log("uid->", uid);
    /* this.store.select(getProductByUid, uid).subscribe(x => {
      this.product = x;
    }); */
    /* this.store.select('patrocinador').subscribe(({ loaded, patrocinador }) => {
      if(loaded){ 
        this.patrocinador = patrocinador; 
      }
    }); */

    /* this.store.dispatch(actionsPatrocinador.loadPatrocinador(
      { filtros: this.userId }
    )); */
  }

  private handleProduct(product: any) {
    if (!product) {
      const filtros = { page: 1, size: 10, _id: this.id };
      this.store.dispatch(actionsProducts.loadProducts({ filtros }));
    } else {
      this.product = product;
    }
  }

  selectedProduct(producto: any) {
    //this.store.dispatch(actionsProductsSelected.loadProductSelected({product: {...producto, quantity: 1}}));
    this.store.dispatch(actionsProductsSelected.addProductSelected({ product: [{ ...producto, quantity: 1 }] }));
  }

}
