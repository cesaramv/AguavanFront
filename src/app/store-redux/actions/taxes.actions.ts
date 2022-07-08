import { createAction, props } from '@ngrx/store';
import { pagination } from '../models/pagination';

export const loadTaxes = createAction(
    '[Admin Taxes Component] loader taxes',
    props<{filtros: any}>());

export const loadTaxesSuccess = createAction(
    '[Admin Taxes Component] List taxes',
    props<{
        taxes: any[],
        pagination: pagination
    }>()
);

export const loadTaxesError = createAction(
    '[Admin Taxes Component] Error loader taxes',
    props<{payload: any}>()
);