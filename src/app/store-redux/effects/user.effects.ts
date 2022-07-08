import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as userActions from '../actions/user.actions';
import { UsersService } from '../../services/users.service';
import { DocumentService, DepartmentsService } from '../../core/services/index';
import { StateUserService } from '../../core/services/state-user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private readonly usersService: UsersService,
        private readonly documentService: DocumentService,
        private readonly departmentService: DepartmentsService,
        private readonly stateUserService: StateUserService,
        private readonly store: Store<AppState>
    ) { }

    /*     loadMovies$ = createEffect(() => this.actions$.pipe(
            ofType(userActions.loadUser),
            mergeMap(({ userId }) => this.usersService.listarPorId(userId)
                .pipe(
                    mergeMap((user) =>
                        forkJoin({
                            documentsType: this.documentService.listar({ state: true }),
                            departments: this.departmentService.listar({ state: true }),
                            statesUsers: this.stateUserService.listar({ state: true }),
                        }).pipe(
                            map(({ documentsType, departments, statesUsers }) => {
                                return userActions.loadUserSuccess({
                                    user,
                                    documentsType: documentsType['content'],
                                    departments: departments['content'],
                                    statesUsers: statesUsers['content']
                                })
                            }),
                            catchError(err => of(userActions.loadUserError({ payload: err })))
                        )
                    )
    
                )
            )
        ));
    } */

    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.loadUser),
        mergeMap(({ userId }) => this.usersService.listarPorId(userId)
            .pipe(
                map((data: any) => {
                    return userActions.loadUserSuccess({
                        user: data
                    })
                }),
                catchError(err => of(userActions.loadUserError({ payload: err })))
            )
        )
    ));
}