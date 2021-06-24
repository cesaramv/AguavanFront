import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as citiesByDepartmentActions from '../actions/cities-by-department.actions';
import { CityService } from '../../core/services/city.service';

@Injectable()
export class CitiesByDepartmentEffects {

    constructor(
        private actions$: Actions,
        private readonly cityService: CityService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(citiesByDepartmentActions.loadCitiesByDepartment),
        mergeMap(({ filtros }) =>this.cityService.listar(filtros)
            .pipe(
                map(( datos: any ) => {
                    return citiesByDepartmentActions.loadCitiesByDepartmentSuccess({
                        cities: datos.content
                    })
                }),
                catchError(err => of(citiesByDepartmentActions.loadCitiesByDepartmentError({ payload: err })))
            )
        )
    ));
}