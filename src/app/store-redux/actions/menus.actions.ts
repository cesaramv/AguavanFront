import { createAction, props } from '@ngrx/store';
import { MenuModel } from '../../shared/models/menu.model';

export const loadMenus = createAction(
    '[Component Menus] loadMenus',
    props<{filtros: any}>()
);

export const loadMenusSuccess = createAction(
    '[Menus Component] List Menus',
    props<{ menus: MenuModel[] }>()
);

export const loadMenusError = createAction(
    '[Menus Component] Error loader Menus',
    props<{payload: any}>()
);


export const loadRefreshMenus = createAction(
    '[Component Menus] loadRefreshMenus',
    props<{filtros: any}>()
);

export const loadRefreshMenusSuccess = createAction(
    '[Menus Component] List refresh menus',
    props<{ menus: MenuModel[] }>()
);

export const loadRefreshMenusError = createAction(
    '[Menus Component] Error loader Menus',
    props<{payload: any}>()
);