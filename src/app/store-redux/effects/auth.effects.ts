import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, filter } from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../../core/services/index';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private readonly authService: AuthService,
    ) { }

    loadAuth$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.loadAuth),
        mergeMap((action) => this.authService.postAuth(action.filtros)
            .pipe(
                map((datos: any) => {
                    return authActions.loadAuthSuccess({ auth: datos })
                }),
                catchError(err => of(authActions.loadAuthError({ payload: err })))
            ))
    ));

    loadAuthRefresh$ = createEffect(() => this.actions$.pipe(
        ofType(authActions.loadRefreshAuth),
        mergeMap(() => this.authService.postAuthResfresh()
            .pipe(
                map((datos: any) => {
                    return authActions.loadAuthSuccess({ auth: datos })
                }),
                catchError(err => of(authActions.loadAuthError({ payload: err })))
            ))
    ));
}