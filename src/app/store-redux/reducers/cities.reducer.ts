import { createReducer, on } from '@ngrx/store';
import { loadCities, loadCitiesSuccess, loadCitiesError } from '../actions';
import { pagination, paginationInit } from '../models/pagination';

export interface citiesState {
    cities: any[];
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    pagination: pagination
}

export const citiesInitialState: citiesState = {
    cities: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    pagination: paginationInit
}

const _citiesReducer = createReducer(citiesInitialState,

    on(loadCities, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadCitiesSuccess, (state, { cities, pagination }) => ({
        ...state,
        loading: false,
        loaded: true,
        cities: [...cities],
        pagination: {...pagination}
    })),

    on(loadCitiesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);

export function citiesReducer(state, action) {
    return _citiesReducer(state, action);
}