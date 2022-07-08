import { pagination, paginationInit } from './../models/pagination';
import { createReducer, on } from '@ngrx/store';
import { loadDepartments, loadDepartmentsSuccess, loadDepartmentsError } from '../actions';

export interface DepartmentsState {
    departments: any[],
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    pagination: pagination
}

export const departmentsInitialState: DepartmentsState = {
    departments: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    pagination: paginationInit
}

const _departmentsReducer = createReducer(departmentsInitialState,

    on(loadDepartments, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadDepartmentsSuccess, (state, { departments, pagination }) => ({
        ...state,
        loading: false,
        loaded: true,
        departments: [...departments],
        pagination: {...pagination}
    })),

    on(loadDepartmentsError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),
);

export function departmentsReducer(state, action) {
    return _departmentsReducer(state, action);
}