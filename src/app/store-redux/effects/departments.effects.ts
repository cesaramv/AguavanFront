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
                map(( datos: any ) => {
                    return departmentsActions.loadDepartmentsSuccess({
                        departments: datos.content,
                        totalElements : datos.totalElements,
                        number : datos.number,
                        totalPages : datos.totalPages
                    })
                }),
                catchError(err => of(departmentsActions.loadDepartmentsError({ payload: err })))
            ))
    ));
}