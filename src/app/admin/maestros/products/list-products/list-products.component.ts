import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListProductsConfig } from './list-products.config';
import { ProductService } from '@core/services/product.service';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import * as actionsProducts from '../../../../store-redux/actions/products.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, OnDestroy {

  configuracion: ListProductsConfig = new ListProductsConfig();
  subscription: Subscription[] = [];
  pageCuerrent: number = 1;

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly productService: ProductService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('products').pipe(
        filter(data => !!data && !!this.configuracion.gridList.component),
        tap(this.handlerGrid.bind(this))
      ).subscribe()
    );
    this.getDatos();
  }

  private handlerGrid({ products, pagination }) {
    this.configuracion.gridList.component.limpliar();
    this.configuracion.gridList.component.cargarDatos(
      products, pagination
    );
  }

  private getDatos(page = 1, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true };
    if (addParams) {
      params = { ...params, ...addParams };
    }
    this.store.dispatch(actionsProducts.loadProducts({filtros: params}));
  }

  clickCelda(event){
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/productos/${event.row.uid}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.productService.eliminar(event.row.uid).subscribe(resp => {
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

  clickPaginador(event){
    this.getDatos(event);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }

}
