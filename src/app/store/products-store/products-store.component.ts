import { AppState } from './../../store-redux/app.reducer';
import { Store } from '@ngrx/store';
import * as actionsProducts from '../../store-redux/actions/products.actions';
import * as actionsProductsSelected from '../../store-redux/actions/products-selected.actions';

import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-store',
  templateUrl: './products-store.component.html',
  styleUrls: ['./products-store.component.css']
})
export class ProductsStoreComponent implements OnInit {

  estaIdentificado: boolean;
  produtos: any[];
  productsSeleted: any[];

  constructor(
    private readonly loginService: LoginService,
    private readonly store: Store<AppState>
  ) { 
    this.estaIdentificado = this.loginService.estaLogueado();
    this.productsSeleted = [];
  }

  ngOnInit(): void {
    this.store.select('products').subscribe(({loaded, products}) => {
      if(loaded){
        this.produtos = products;
      }
    });
    this.getProducts();
  }

  getProducts(){
    const filtros = { state: true, isPaged: false }
    this.store.dispatch(actionsProducts.loadProducts({filtros}));
  }

  selectedProduct(producto: any){
    //this.store.dispatch(actionsProductsSelected.loadProductSelected({product: {...producto, quantity: 1}}));
    this.store.dispatch(actionsProductsSelected.addProductSelected({product: [{...producto, quantity: 1}]}));
  }

}
