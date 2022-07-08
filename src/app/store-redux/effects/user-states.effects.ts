import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as userStatesActions from '../actions/user-states.actions';
import { StateUserService } from '../../core/services/state-user.service';
import { of } from 'rxjs';

@Injectable()
export class UserStatesEffects {

    constructor(
        private actions$: Actions,
        private userStatesService: StateUserService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(userStatesActions.loadUserStates),
        mergeMap((action) => this.userStatesService.listar(action.filtros)
            .pipe(
                map((datos: any) => {
                    return userStatesActions.loadUserStatesSuccess({
                        userStates: datos.content.map(x => ({ ...x, _state: x.state ? 'Si' : 'No' })),
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
                catchError(err => of(userStatesActions.loadUserStatesError({ payload: err })))
            ))
    ));
}