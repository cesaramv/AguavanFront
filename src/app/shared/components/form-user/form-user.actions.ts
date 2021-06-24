import { createAction, props } from '@ngrx/store';

export const getUsers = createAction('[List users] GetUsers');
export const getUserById = createAction(
    '[User by id] GetUserById',
    props<{userId: number}>()
    );