import { Component, OnInit } from '@angular/core';
import { ListProductsConfig } from './list-products.config';
import { ProductService } from '@core/services/product.service';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import * as actionsProducts from '../../../../store-redux/actions/products.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store-redux/app.reducer';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  configuracion: ListProductsConfig = new ListProductsConfig();

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService,
    private readonly alertService: AlertService,
    private readonly productService: ProductService,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('products').subscribe(({loaded, products, totalElements, number, totalPages}) => {
      
      if(loaded){
        const data = products.map(x => { return {...x, _state: x.state ? 'Si' : 'No' } });
        this.configuracion.gridList.component.cargarDatos(
          data, { totalElements, number, totalPages }
        );
      }
    })
    this.getDatos();
  }

  private getDatos(page = 0, size = 10, sort = 'registerDate,desc', addParams?: any) {
    let params = { page, size, sort, isPaged: true };
    if (addParams) {
      params = { ...params, ...addParams };
    }
    this.store.dispatch(actionsProducts.loadProducts({filtros: params}));
    /* this.productService.listar(params).subscribe((datos: any) => {
      const data = datos.content.map(x => { return {...x, _state: x.state ? 'Si' : 'No' } });
      this.configuracion.gridList.component.cargarDatos(
        data, {
          totalElements: datos.totalElements,
          number: datos.number,
          totalPages: datos.totalPages
        }
      );
    }); */
  }

  clickCelda(event){
    if (event.tipeAccion === 'editar') {
      this.router.navigate([`/admin/maestros/productos/${event.row.productId}`]);
    } else {
      this.translate.get('global.deleteRow').subscribe(mensaje => {
        this.alertService.confirm(mensaje).then(resp => {
          if (resp) {
            this.productService.eliminar(event.row.productId).subscribe(resp => {
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

}
