import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as productsActions from '../actions/products.actions';
//import { CityService } from '../../core/services/city.service';
import { ProductService } from '../../core/services/product.service';

@Injectable()
export class ProductsEffects {

    constructor(
        private actions$: Actions,
        private readonly productService: ProductService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(productsActions.loadProducts),
        mergeMap(({ filtros }) => this.productService.listar(filtros)
            .pipe(
                map(( datos: any ) => {
                    return productsActions.loadProductsSuccess({
                        products: datos.content,
                        totalElements : datos.totalElements,
                        number : datos.number,
                        totalPages : datos.totalPages
                    })
                }),
                catchError(err => of(productsActions.loadProductsError({ payload: err })))
            )
        )
    ));
}