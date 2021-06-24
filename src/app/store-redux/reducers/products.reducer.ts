import { createReducer, on } from '@ngrx/store';
import { loadProducts, loadProductsSuccess, loadProductsError } from '../actions';

export interface ProductsState {
    products: any,
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    totalElements: number,
    number: number,
    totalPages: number
}

export const productsInitialState: ProductsState = {
    products: null,
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    totalElements: 0,
    number: 0,
    totalPages: 0
}

const _productsReducer = createReducer(productsInitialState,

    on(loadProducts, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadProductsSuccess, (state, { products, totalElements, number, totalPages }) => ({
        ...state,
        loading: false,
        loaded: true,
        products: [...products],
        totalElements,
        number,
        totalPages
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