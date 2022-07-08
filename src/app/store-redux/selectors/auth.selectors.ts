import { getUsers } from './../../shared/components/form-user/form-user.actions';
import { DepartmentsState } from '../reducers/departments.reducer';
import { AppState } from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, MenusState } from '../reducers';


export const getState = createFeatureSelector<AuthState>(
    'auth'
);

export const getMenuMainSelector = createSelector(
    getState,
    ({ auth }) => auth?.menu
);

export const getUserSelector = createSelector(
    getState,
    ({ auth }) => auth?.user
);