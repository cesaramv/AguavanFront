import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersError } from '../actions';
import { pagination, paginationInit } from '../models/pagination';

export interface UsersState {
    users: any[],
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    pagination: pagination
}

export const usersInitialState: UsersState = {
    users: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    pagination: paginationInit
}

const _usersReducer = createReducer(usersInitialState,

    on(loadUsers, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadUsersSuccess, (state, { users, pagination }) => ({
        ...state,
        loading: false,
        loaded: true,
        users: [...users],
        pagination: { ...pagination }
    })),

    on(loadUsersError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),
);

export function usersReducer(state, action) {
    return _usersReducer(state, action);
}