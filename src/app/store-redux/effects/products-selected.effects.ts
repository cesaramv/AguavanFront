import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as productsSelectedActions from '../actions/products-selected.actions';
import { ProductService } from '../../core/services/product.service';

@Injectable()
export class ProductsSelectedEffects {

    constructor(
        private actions$: Actions,
        private readonly productService: ProductService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(productsSelectedActions.loadProductSelected),
        mergeMap(({ product }) => {
            const _filtros = { state: true, isPaged: false, productId: product.map(x => x.code) }
            return this.productService.listar(_filtros)
                .pipe(
                    map((datos: any) => {
                        return productsSelectedActions.addProductSelected({
                            product: this.asignValues(datos.content, product)
                        })
                    }),
                    catchError(err => of(productsSelectedActions.loadProductSelectedError({ payload: err })))
                )
        })
    ));

    private asignValues(items: any[], productsFilter: any) {
        const _products = items.map(x => {
            const _quantity = productsFilter.find(t => t.code === x.productId).quantity;
            return {
                ...x, quantity: _quantity
            }
        })

        return _products;
    }

}