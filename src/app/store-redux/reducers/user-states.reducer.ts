import { createReducer, on } from '@ngrx/store';
import {
    loadUserStates,
    loadUserStatesSuccess,
    loadUserStatesError
} from '../actions';
import { pagination, paginationInit } from '../models/pagination';

export interface UserStatesState {
    userStates: any[],
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    pagination: pagination
}

export const userStatesInitialState: UserStatesState = {
    userStates: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    pagination: paginationInit
}

const _userStatesReducer = createReducer(userStatesInitialState,

    on(loadUserStates, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadUserStatesSuccess, (state, { userStates, pagination }) => ({
        ...state,
        loading: false,
        loaded: true,
        userStates: [...userStates],
        pagination: { ...pagination }
    })),

    on(loadUserStatesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),
);

export function userStatesReducer(state, action) {
    return _userStatesReducer(state, action);
}