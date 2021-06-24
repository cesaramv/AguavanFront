import { createReducer, on } from '@ngrx/store';
import { loadPatrocinador, loadPatrocinadorSuccess, loadPatrocinadorError } from '../actions';

export interface patrocinadorState {
    patrocinador: any;
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any
}

export const patrocinadorInitialState: patrocinadorState = {
    patrocinador: null,
    loaded: false,
    loading: false,
    error: null,
    filtros: null
}

const _patrocinadorReducer = createReducer(patrocinadorInitialState,

    on(loadPatrocinador, (state, { filtros }) => ( { ...state, loading: true, filtros })),

    on(loadPatrocinadorSuccess, (state, { patrocinador }) => {debugger
        return({
        ...state,
        loading: false,
        loaded: true,
        patrocinador: {...patrocinador}
    })}),

    on(loadPatrocinadorError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);

export function patrocinadorReducer(state, action) {
    return _patrocinadorReducer(state, action);
}