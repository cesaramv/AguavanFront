import { createAction, props } from '@ngrx/store';

export const loadCities = createAction(
    '[Component Cities] loadCities',
    props<{filtros: any}>()
);

export const loadCitiesSuccess = createAction(
    '[Cities Component] List Cities',
    props<{
        cities: any[],
        totalElements: number,
        number: number,
        totalPages: number
    }>()
);

export const loadCitiesError = createAction(
    '[Cities Component] Error loader Cities',
    props<{payload: any}>()
);