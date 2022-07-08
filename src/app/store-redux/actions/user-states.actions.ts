import { createAction, props } from '@ngrx/store';
import { pagination } from '../models/pagination';

export const loadUserStates = createAction(
    '[Admin User states Component] loader user states',
    props<{filtros: any}>());

export const loadUserStatesSuccess = createAction(
    '[Admin User states Component] List user states',
    props<{
        userStates: any[],
        pagination: pagination
    }>()
);

export const loadUserStatesError = createAction(
    '[Admin User states Component] Error loader user states',
    props<{payload: any}>()
);