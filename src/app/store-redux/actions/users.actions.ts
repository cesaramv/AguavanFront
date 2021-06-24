import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction(
    '[Admin Users Component] loader users',
    props<{filtros: any}>());

export const loadUsersSuccess = createAction(
    '[Admin Users Component] List users',
    props<{
        users: any[],
        totalElements: number,
        number: number,
        totalPages: number
    }>()
);

export const loadUsersError = createAction(
    '[Admin Users Component] Error loader users',
    props<{payload: any}>()
);