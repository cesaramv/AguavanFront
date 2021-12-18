import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as orderActions from '../actions/order.actions';
import { OrderService } from '../../core/services/order.service';

@Injectable()
export class OrdersEffects {

    constructor(
        private actions$: Actions,
        private readonly orderService: OrderService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(orderActions.loadOrder),
        mergeMap(({ filtros }) => this.orderService.listar(filtros)
            .pipe(
                map((datos: any) => {
                    return orderActions.loadOrderSuccess({
                        orders: datos.content,
                        totalElements: datos.totalElements,
                        number: datos.number,
                        totalPages: datos.totalPages
                    })
                }),
                catchError(err => of(orderActions.loadOrderError({ payload: err })))
            )
        )
    ));

    loadOrder$ = createEffect(() => this.actions$.pipe(
        ofType(orderActions.loadOrderById),
        mergeMap(({ filtros }) => this.orderService.listarPorId(filtros)
            .pipe(
                map((datos: any) => (
                    orderActions.loadOrderByIdSuccess({ order: datos })
                )),
                catchError(err => of(orderActions.loadOrderByIdError({ payload: err })))
            )
        )
    ));
}