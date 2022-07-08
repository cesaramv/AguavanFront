import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as taxesActions from '../actions/taxes.actions';
import { TaxService } from '../../core/services/tax.service';

@Injectable()
export class TaxesEffects {

    constructor(
        private actions$: Actions,
        private taxService: TaxService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(taxesActions.loadTaxes),
        mergeMap((action) => this.taxService.listar(action.filtros)
            .pipe(
                map((datos: any) => {
                    return taxesActions.loadTaxesSuccess({
                        taxes: datos.content.map(x => ({ ...x, _state: x.state ? 'Si' : 'No' })),
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
                catchError(err => of(taxesActions.loadTaxesError({ payload: err })))
            ))
    ));
}