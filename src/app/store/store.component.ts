import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../store-redux/app.reducer';
import * as actionsProducts from '../store-redux/actions/products.actions';

import { ProductoService } from '../services/producto.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  estaIdentificado: boolean;
  produtos: any[];

  constructor(
    private readonly productoService: ProductoService,
    private readonly loginService: LoginService,
    private readonly store: Store<AppState>
  ) { 
    this.estaIdentificado = this.loginService.estaLogueado();
  }

  ngOnInit(): void {
    this.store.select('products').subscribe(({loaded, products}) => {
      if(loaded){
        this.produtos = products;
      }
    });
    this.getProducts();
    /* this.productoService.listarProductos().subscribe((resp: any) => {
      this.produtos = resp;
    }); */
  }

  getProducts(){
    const filtros = { state: true, isPaged: false }
    this.store.dispatch(actionsProducts.loadProducts({filtros}));
  }

}
