import { createReducer, on } from '@ngrx/store';
import {
    loadTaxes,
    loadTaxesSuccess,
    loadTaxesError
} from '../actions';
import { pagination, paginationInit } from '../models/pagination';

export interface TaxesState {
    taxes: any[],
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    pagination: pagination
}

export const taxesInitialState: TaxesState = {
    taxes: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    pagination: paginationInit
}

const _taxesReducer = createReducer(taxesInitialState,

    on(loadTaxes, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadTaxesSuccess, (state, { taxes, pagination }) => ({
        ...state,
        loading: false,
        loaded: true,
        taxes: [...taxes],
        pagination: { ...pagination }
    })),

    on(loadTaxesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),
);

export function taxesReducer(state, action) {
    return _taxesReducer(state, action);
}