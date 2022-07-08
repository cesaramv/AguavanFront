import { createReducer, on } from '@ngrx/store';
import { loadAuth, loadAuthSuccess, loadAuthError } from '../actions';

export interface AuthState {
    auth: any;
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any
}

export const authInitialState: AuthState = {
    auth: null,
    loaded: false,
    loading: false,
    error: null,
    filtros: null
}

const _authReducer = createReducer(authInitialState,

    on(loadAuth, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadAuthSuccess, (state, { auth }) => {
        return {
            ...state,
            loading: false,
            loaded: true,
            auth: {...auth},
        }
    }),

    on(loadAuthError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}