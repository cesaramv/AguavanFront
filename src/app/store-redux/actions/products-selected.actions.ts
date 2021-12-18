import { createAction, props } from '@ngrx/store';

export const loadProductSelected = createAction(
    '[Component Store] loadProductSelected',
    props<{product: any}>()
);

export const removeProductSelected = createAction(
    '[Store Component] Remove Product Selected',
    props<{ product: any }>()
);

export const addProductSelected = createAction(
    '[Store Component] Add Product Selected',
    props<{ product: any[] }>()
);

export const loadProductSelectedError = createAction(
    '[Store Component] error load products',
    props<{payload: any}>()
)