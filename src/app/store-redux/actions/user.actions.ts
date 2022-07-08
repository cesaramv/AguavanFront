import { UserModel } from './../../shared/models/user.model';
import { createAction, props } from '@ngrx/store';

export const loadUser = createAction(
    '[Admin User Component] loader user by id',
    props<{userId: number}>());

export const loadUserSuccess = createAction(
    '[Admin User Component] user by id',
    props<{
        user: UserModel,
        /* documentsType: any,
        departments: any,
        //cities: any,
        statesUsers: any */
    }>()
);

export const loadUserError = createAction(
    '[Admin User Component] Error loader user by id',
    props<{payload: any}>()
);