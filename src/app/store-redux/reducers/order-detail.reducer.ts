import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { loadOrderById, loadOrderByIdSuccess, loadOrderByIdError } from '../actions/order.actions';

export interface orderDetailState {
    order: any;
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any
}

export const orderDetailInitialState: orderDetailState = {
    order: null,
    loaded: false,
    loading: false,
    error: null,
    filtros: null
}

const _orderDetailReducer = createReducer(orderDetailInitialState,

    on(loadOrderById, (state, {filtros}) => ({ ...state, loading: true, filtros })),

    on(loadOrderByIdSuccess, (state, { order }) => {
        return({
        ...state,
        loading: false,
        loaded: true,
        order: {...order}
    })}),

    on(loadOrderByIdError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);

export function orderDetailReducer(state, action) {
    return _orderDetailReducer(state, action);
}