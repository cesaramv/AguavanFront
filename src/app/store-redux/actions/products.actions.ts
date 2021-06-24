import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction(
    '[Products Component] loadProducts',
    props<{filtros: any}>()
);

export const loadProductsSuccess = createAction(
    '[Products Component] success load products',
    props<{ 
        products: any, 
        totalElements: number,
        number: number,
        totalPages: number
    }>()
);

export const loadProductsError = createAction(
    '[Products Component] error load products',
    props<{payload: any}>()
)