import { createAction, props } from '@ngrx/store';
import { pagination } from '../models/pagination';

export const loadOrder = createAction(
    '[Order Detaild Component] loadOrder',
    props<{ filtros: any }>()
);

export const loadOrderSuccess = createAction(
    '[Order success data  OrderComponent] loadOrderSuccess',
    props<{
        orders: any[],
        pagination: pagination
    }>()
);

export const loadOrderError = createAction(
    '[Order erro OrderComponent] Error loader Cities',
    props<{payload: any}>()
);


export const loadOrderById = createAction(
    '[Order by id Detaild Component] loadOrderById',
    props<{ filtros: any }>()
);

export const loadOrderByIdSuccess = createAction(
    '[Order by id success data  OrderComponent] loadOrderByIdSuccess',
    props<{
        order: any
    }>()
);

export const loadOrderByIdError = createAction(
    '[Order by id erro OrderComponent] Error loader order detal by id',
    props<{payload: any}>()
);
