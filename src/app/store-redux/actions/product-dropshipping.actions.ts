import { createAction, props } from '@ngrx/store';

export const loadProductDropshipping = createAction(
    '[Component product detail] loadProduct dropshipping',
    props<{product: any}>()
);

export const addProductDropshipping = createAction(
    '[product detail Component] Add Product dropshipping',
    props<{ product: any[] }>()
);

export const loadProductSelectedError = createAction(
    '[product detail Component] error load products dropshipping',
    props<{payload: any}>()
)