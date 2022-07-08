import { createReducer, on } from '@ngrx/store';
import {
    loadOrderStates,
    loadOrderStatesSuccess,
    loadOrderStatesError
} from '../actions';
import { pagination, paginationInit } from '../models/pagination';

export interface OrderStatesState {
    orderStates: any[],
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    pagination: pagination
}

export const orderStatesInitialState: OrderStatesState = {
    orderStates: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    pagination: paginationInit
}

const _orderStatesReducer = createReducer(orderStatesInitialState,

    on(loadOrderStates, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadOrderStatesSuccess, (state, { orderStates, pagination }) => ({
        ...state,
        loading: false,
        loaded: true,
        orderStates: [...orderStates],
        pagination: { ...pagination }
    })),

    on(loadOrderStatesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),
);

export function orderStatesReducer(state, action) {
    return _orderStatesReducer(state, action);
}