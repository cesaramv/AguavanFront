import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { loadOrder, loadOrderSuccess, loadOrderError } from '../actions/order.actions';

export interface ordersState {
    orders: any;
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,    
    totalElements: number,
    number: number,
    totalPages: number,
    orderDetail: any
}

export const ordersInitialState: ordersState = {
    orders: null,
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    totalElements: 0,
    number: 0,
    totalPages: 0,
    orderDetail: null
}

const _ordersReducer = createReducer(ordersInitialState,

    on(loadOrder, (state, {filtros}) => ({ ...state, loading: true, filtros })),

    on(loadOrderSuccess, (state, { orders, totalElements, number, totalPages }) => {
        return({
        ...state,
        loading: false,
        loaded: true,
        orders: [...orders],
        totalElements,
        number,
        totalPages
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