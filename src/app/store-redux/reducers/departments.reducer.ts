import { createReducer, on } from '@ngrx/store';
import { loadDepartments, loadDepartmentsSuccess, loadDepartmentsError } from '../actions';

export interface DepartmentsState {
    departments: any[],
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    totalElements: number,
    number: number,
    totalPages: number
}

export const departmentsInitialState: DepartmentsState = {
    departments: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    totalElements: 0,
    number: 0,
    totalPages: 0
}

const _departmentsReducer = createReducer(departmentsInitialState,

    on(loadDepartments, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadDepartmentsSuccess, (state, { departments, totalElements, number, totalPages }) => ({
        ...state,
        loading: false,
        loaded: true,
        departments: [...departments],
        totalElements,
        number,
        totalPages
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