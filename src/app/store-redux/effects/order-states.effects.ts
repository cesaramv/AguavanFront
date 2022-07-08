import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as orderStatesActions from '../actions/order-states.actions';
import { OrderStateService } from '../../core/services/order-state.service';
import { of } from 'rxjs';

@Injectable()
export class OrderStatesEffects {

    constructor(
        private actions$: Actions,
        private orderStateService: OrderStateService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(orderStatesActions.loadOrderStates),
        mergeMap((action) => this.orderStateService.listar(action.filtros)
            .pipe(
                map((datos: any) => {
                    return orderStatesActions.loadOrderStatesSuccess({
                        orderStates: datos.content.map(x => ({ ...x, _state: x.state ? 'Si' : 'No' })),
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
                catchError(err => of(orderStatesActions.loadOrderStatesError({ payload: err })))
            ))
    ));
}