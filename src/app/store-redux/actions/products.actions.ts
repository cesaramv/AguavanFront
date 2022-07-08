import { createAction, props } from '@ngrx/store';
import { pagination } from '../models/pagination';

export const loadProducts = createAction(
    '[Products Component] loadProducts',
    props<{filtros: any}>()
);

export const loadProductsSuccess = createAction(
    '[Products Component] success load products',
    props<{ 
        products: any, 
        pagination: pagination
    }>()
);

export const loadProductsError = createAction(
    '[Products Component] error load products',
    props<{payload: any}>()
)