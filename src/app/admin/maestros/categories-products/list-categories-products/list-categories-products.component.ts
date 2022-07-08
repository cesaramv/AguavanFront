import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';
import * as actionsProductCategories from '../../../../store-redux/actions/product-categories.actions';

import { AlertService, ProductCategoryService } from 'src/app/core/services';
import { ListCategoriesProductsConfig } from './list-categories-products.config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-categories-products',
  templateUrl: './list-categories-products.component.html',
  styleUrls: ['./list-categories-products.component.css']
})
export class ListCategoriesProductsComponent implements OnInit, OnDestroy {

  configuracion: ListCategoriesProductsConfig = new ListCategoriesProductsConfig();
  subscription: Subscription[] = [];
  pageCuerrent: number = 1;

  constructor(
    private readonly categoryService: ProductCategoryService,
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('productCategories').pipe(
        filter(data => !!data && !!this.configuracion.gridList.component),
        tap(this.handlerGrid.bind(this))
      ).subscribe()
    );
    this.getDatos();
  }

  private handlerGrid({ productCategories, pagination }) {
    this.configuracion.gridList.component.limpliar();
    this.configuracion.gridList.component.cargarDatos(
      productCategories, pagination
    );
  }

  private getDatos(page = 1, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true, ...addParams };
    this.store.dispatch(actionsProductCategories.loadProductCategories({ filtros: params }));
  }

  clickCelda(event){
    if(event.tipeAccion === 'editar'){
      this.router.navigate([`/admin/maestros/categorias_productos/${event.row.uid}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => { 
        this.alertService.confirm(mensaje).then(resp =>{
          if(resp){
            this.categoryService.eliminar(event.row.uid).subscribe(resp => {
              this.translate.get('global.eliminadoExitosoMensaje').subscribe(menssage => { 
                this.alertService.success(menssage).then(() => {
                  this.getDatos();
                });
              });
            });
          }
        });
      })

    }
  }

  clickPaginador(event){
    this.pageCuerrent = event;
    this.getDatos(event);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(x => x.unsubscribe());
  }

}
