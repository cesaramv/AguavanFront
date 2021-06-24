import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as usersActions from '../actions/users.actions';
import { UsersService } from '../../services/users.service';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(usersActions.loadUsers),
        mergeMap((action) => this.usersService.listar(action.filtros)
            .pipe(
                map(( users: any ) => {
                    const _data = users.content.map(x => {
                        return {
                            ...x,
                            email: x.email.toLowerCase(),
                            nameFull: (x.firstName + ' ' + x.lastName).toLowerCase()
                        }
                    });
                    return usersActions.loadUsersSuccess({
                        users: _data,
                        totalElements : users.totalElements,
                        number : users.number,
                        totalPages : users.totalPages
                    })
                }),
                catchError(err => of(usersActions.loadUsersError({ payload: err })))
            ))
    ));
}