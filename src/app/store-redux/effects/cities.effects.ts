import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as citiesActions from '../actions/cities.actions';
import { CityService } from '../../core/services/city.service';

@Injectable()
export class CitiesEffects {

    constructor(
        private actions$: Actions,
        private readonly cityService: CityService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(citiesActions.loadCities),
        mergeMap(({ filtros }) =>this.cityService.listar(filtros)
            .pipe(
                map(( datos: any ) => {
                    return citiesActions.loadCitiesSuccess({
                        cities: datos.content,
                        totalElements : datos.totalElements,
                        number : datos.number,
                        totalPages : datos.totalPages
                    })
                }),
                catchError(err => of(citiesActions.loadCitiesError({ payload: err })))
            )
        )
    ));
}