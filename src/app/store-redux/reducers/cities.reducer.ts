import { createReducer, on } from '@ngrx/store';
import { loadCities, loadCitiesSuccess, loadCitiesError } from '../actions';

export interface citiesState {
    cities: any[];
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    totalElements: number,
    number: number,
    totalPages: number
}

export const citiesInitialState: citiesState = {
    cities: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    totalElements: 0,
    number: 0,
    totalPages: 0
}

const _citiesReducer = createReducer(citiesInitialState,

    on(loadCities, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadCitiesSuccess, (state, { cities, totalElements, number, totalPages }) => ({
        ...state,
        loading: false,
        loaded: true,
        cities: [...cities],
        totalElements,
        number,
        totalPages
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