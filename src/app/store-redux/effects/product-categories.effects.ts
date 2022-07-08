import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as productCategoriesActions from '../actions/product-categories.actions';
import { ProductCategoryService } from '../../core/services/product-category.service';
import { of } from 'rxjs';

@Injectable()
export class ProductCategoriesEffects {

    constructor(
        private actions$: Actions,
        private productCategoryService: ProductCategoryService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(productCategoriesActions.loadProductCategories),
        mergeMap((action) => this.productCategoryService.listar(action.filtros)
            .pipe(
                map((datos: any) => {
                    return productCategoriesActions.loadProductCategoriesSuccess({
                        productCategories: datos.content.map(x => ({ ...x, _state: x.state ? 'Si' : 'No' })),
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
                catchError(err => of(productCategoriesActions.loadProductCategoriesError({ payload: err })))
            ))
    ));
}