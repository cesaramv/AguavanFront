import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as productsActions from '../actions/products.actions';
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
                map((datos: any) => {
                    return productsActions.loadProductsSuccess({
                        products: datos.content.map(x => ({ ...x, _state: x.state ? 'Si' : 'No' })),
                        pagination: {
                            hasNextPage: datos.hasNextPage,
                            hasPrevPage: datos.hasPrevPage,
                            next: datos.next,
                            page: datos.page,
                            pagingCounter: datos.pagingCounter,
                            prev: datos.prev,
                            totalElements: datos.totalElements,
                            totalPages: datos.totalPages,
                        },
                    })
                }),
                catchError(err => of(productsActions.loadProductsError({ payload: err })))
            )
        )
    ));

}