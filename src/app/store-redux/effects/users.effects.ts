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
                map((datos: any) => {
                    const _data = datos.content.map(x => {
                        return {
                            ...x,
                            email: x.email.toLowerCase(),
                            nameFull: (x.firstName + ' ' + x.lastName).toLowerCase(),
                            _state: x.state ? 'Si' : 'No'
                        }
                    });
                    return usersActions.loadUsersSuccess({
                        users: _data,
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
                catchError(err => of(usersActions.loadUsersError({ payload: err })))
            ))
    ));
}