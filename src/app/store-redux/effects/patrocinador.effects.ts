import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as patrocinadorActions from '../actions/patrocinador.actions';
import { UsersService } from 'src/app/services/users.service';

@Injectable()
export class PatrocinadorEffects {

    constructor(
        private actions$: Actions,
        private readonly userService: UsersService,
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(patrocinadorActions.loadPatrocinador),
        mergeMap(({ filtros }) =>this.userService.getUserByUsername(filtros)
            .pipe(
                map(( datos: any ) => {
                    return patrocinadorActions.loadPatrocinadorSuccess({
                        patrocinador: datos
                    })
                }),
                catchError(err => of(patrocinadorActions.loadPatrocinadorError({ payload: err })))
            )
        )
    ));
}