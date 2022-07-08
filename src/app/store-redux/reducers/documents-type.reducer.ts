import { createReducer, on } from '@ngrx/store';
import {
    loadDocumentsType,
    loadDocumentsTypeSuccess,
    loadDocumentsTypeError
} from '../actions';
import { pagination, paginationInit } from '../models/pagination';

export interface DocumentsTypeState {
    documentsType: any[],
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    pagination: pagination
}

export const documentsTypeInitialState: DocumentsTypeState = {
    documentsType: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    pagination: paginationInit
}

const _documentsTypeReducer = createReducer(documentsTypeInitialState,

    on(loadDocumentsType, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadDocumentsTypeSuccess, (state, { documentsType, pagination }) => ({
        ...state,
        loading: false,
        loaded: true,
        documentsType: [...documentsType],
        pagination: { ...pagination }
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