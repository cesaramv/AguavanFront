import { createReducer, on } from '@ngrx/store';
import { loadDocumentsType, loadDocumentsTypeSuccess, loadDocumentsTypeError } from '../actions';

export interface DocumentsTypeState {
    documentsType: any[],
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any
    totalElements: number,
    number: number,
    totalPages: number
}

export const documentsTypeInitialState: DocumentsTypeState = {
    documentsType: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    totalElements: 0,
    number: 0,
    totalPages: 0
}

const _documentsTypeReducer = createReducer(documentsTypeInitialState,

    on(loadDocumentsType, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadDocumentsTypeSuccess, (state, { documentsType, totalElements, number, totalPages }) => ({
        ...state,
        loading: false,
        loaded: true,
        documentsType: [...documentsType],
        totalElements,
        number,
        totalPages
    })),

    on(loadDocumentsTypeError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),
);

export function documentsTypeReducer(state, action) {
    return _documentsTypeReducer(state, action);
}