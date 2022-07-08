import { createAction, props } from '@ngrx/store';
import { pagination } from '../models/pagination';

export const loadProductCategories = createAction(
    '[Admin Product categories Component] loader product categories',
    props<{filtros: any}>());

export const loadProductCategoriesSuccess = createAction(
    '[Admin Product categories Component] List product categories',
    props<{
        productCategories: any[],
        pagination: pagination
    }>()
);

export const loadProductCategoriesError = createAction(
    '[Admin Product categories Component] Error loader product categories',
    props<{payload: any}>()
);