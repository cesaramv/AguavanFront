import { createAction, props } from '@ngrx/store';
import { pagination } from '../models/pagination';

export const loadCities = createAction(
    '[Component Cities] loadCities',
    props<{filtros: any}>()
);

export const loadCitiesSuccess = createAction(
    '[Cities Component] List Cities',
    props<{
        cities: any[],
        pagination: pagination
    }>()
);

export const loadCitiesError = createAction(
    '[Cities Component] Error loader Cities',
    props<{payload: any}>()
);