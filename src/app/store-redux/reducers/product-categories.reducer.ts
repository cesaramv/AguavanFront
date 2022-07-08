import { createReducer, on } from '@ngrx/store';
import {
    loadProductCategories,
    loadProductCategoriesSuccess,
    loadProductCategoriesError
} from '../actions';
import { pagination, paginationInit } from '../models/pagination';

export interface ProductCategoriesState {
    productCategories: any[],
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any,
    pagination: pagination
}

export const productCategoriesInitialState: ProductCategoriesState = {
    productCategories: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null,
    pagination: paginationInit
}

const _productCategoriesReducer = createReducer(productCategoriesInitialState,

    on(loadProductCategories, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadProductCategoriesSuccess, (state, { productCategories, pagination }) => ({
        ...state,
        loading: false,
        loaded: true,
        productCategories: [...productCategories],
        pagination: { ...pagination }
    })),

    on(loadProductCategoriesError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),
);

export function productCategoriesReducer(state, action) {
    return _productCategoriesReducer(state, action);
}