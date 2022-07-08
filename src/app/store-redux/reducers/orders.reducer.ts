import { createReducer, on } from '@ngrx/store';
import { loadOrder, loadOrderSuccess, loadOrderError } from '../actions/order.actions';
import { pagination, paginationInit } from '../models/pagination';

export interface ordersState {
    orders: any;
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    pagination: pagination,
    orderDetail: any
}

export const ordersInitialState: ordersState = {
    orders: null,
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    pagination: paginationInit,
    orderDetail: null
}

const _ordersReducer = createReducer(ordersInitialState,

    on(loadOrder, (state, {filtros}) => ({ ...state, loading: true, filtros })),

    on(loadOrderSuccess, (state, { orders, pagination }) => {
        return({
        ...state,
        loading: false,
        loaded: true,
        orders: [...orders],
        pagination: { ...pagination }
    })}),

    on(loadOrderError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);

export function ordersReducer(state, action) {
    return _ordersReducer(state, action);
}