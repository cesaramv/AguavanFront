import { createReducer, on } from '@ngrx/store';
import { loadProducts, loadProductsSuccess, loadProductsError } from '../actions';
import { pagination, paginationInit } from '../models/pagination';

export interface ProductsState {
    products: any,
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    pagination: pagination
}

export const productsInitialState: ProductsState = {
    products: null,
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    pagination: paginationInit
}

const _productsReducer = createReducer(productsInitialState,

    on(loadProducts, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadProductsSuccess, (state, { products, pagination }) => ({
        ...state,
        loading: false,
        loaded: true,
        products: [...products],
        pagination: { ...pagination }
    })),

    on(loadProductsError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),
);

export function productsReducer(state, action) {
    return _productsReducer(state, action);
}