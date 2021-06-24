import { AppState } from './../app.reducer';
//import { UsersState } from './users.reducer';
import { createReducer, on, Store } from '@ngrx/store';
import { loadCitiesByDepartment, loadCitiesByDepartmentSuccess, loadCitiesByDepartmentError } from '../actions';
import { appReducers } from '../app.reducer';
import { userReducer, UserState } from '../reducers/user.reducer';

export interface citiesByDepartmentState {
    cities: any[];
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any
}

export const citiesByDepartmentInitialState: citiesByDepartmentState = {
    cities: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null
}
/* const citiesByDepartmentInitialState: UserState = {
    ...appReducers.user.arguments
} */ //= (store: Store<AppState>) => { return store.select('departments') };

const _citiesByDepartmentReducer = createReducer(citiesByDepartmentInitialState, //appReducers.user.arguments,

    on(loadCitiesByDepartment, (state, { filtros}) => ({ ...state, loading: true, filtros })),

    on(loadCitiesByDepartmentSuccess, (state, { cities }) => ({
        ...state,
        loading: false,
        loaded: true,
        cities: [...cities] //{...state.user, cities: [...cities]}
    })),

    on(loadCitiesByDepartmentError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);

export function citiesByDepartmentReducer(state, action) {
    return _citiesByDepartmentReducer(state, action);
}