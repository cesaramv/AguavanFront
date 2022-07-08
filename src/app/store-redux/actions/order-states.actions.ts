import { createAction, props } from '@ngrx/store';
import { pagination } from '../models/pagination';

export const loadOrderStates = createAction(
    '[Admin Order states Component] loader order states',
    props<{filtros: any}>());

export const loadOrderStatesSuccess = createAction(
    '[Admin Order states Component] List order states',
    props<{
        orderStates: any[],
        pagination: pagination
    }>()
);

export const loadOrderStatesError = createAction(
    '[Admin Order states Component] Error loader order states',
    props<{payload: any}>()
);