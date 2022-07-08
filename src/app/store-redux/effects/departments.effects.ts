import { pagination } from './../models/pagination';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as departmentsActions from '../actions/departments.actions';
import { DepartmentsService } from '../../core/services/departments.service';

import { of } from 'rxjs';

@Injectable()
export class DepartmentsEffects {

    constructor(
        private actions$: Actions,
        private readonly departmentsService: DepartmentsService,
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(departmentsActions.loadDepartments),
        mergeMap((action) => this.departmentsService.listar(action.filtros)
            .pipe(
                map((datos: any) => {
                    return departmentsActions.loadDepartmentsSuccess({
                        departments: datos.content,
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
                catchError(err => of(departmentsActions.loadDepartmentsError({ payload: err })))
            ))
    ));

    deleteDepatment$ = createEffect(() => this.actions$.pipe(
        ofType(departmentsActions.deleteDepartment),
        mergeMap((action) => this.departmentsService.eliminar(action.code)
            .pipe(
                map((data: any) => {
                    return departmentsActions.deleteDepartmentSuccess({
                        code: data
                    })
                }),
                catchError(err => of(departmentsActions.deleteDepartmentError({ error: err })))
            )
        )
    ));
}