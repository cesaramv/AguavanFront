import { createReducer, on } from '@ngrx/store';
import { MenuModel } from '../../shared/models/menu.model';
import { loadMenus, loadMenusSuccess, loadMenusError } from '../actions';

export interface MenusState {
    menus: MenuModel[];
    loaded: boolean,
    loading: boolean,
    error: any,
    filtros: any
}

export const menusInitialState: MenusState = {
    menus: [],
    loaded: false,
    loading: false,
    error: null,
    filtros: null
}

const _menusReducer = createReducer(menusInitialState,

    on(loadMenus, (state, { filtros }) => ({ ...state, loading: true, filtros })),

    on(loadMenusSuccess, (state, { menus }) => { 
        return{
        ...state,
        loading: false,
        loaded: true,
        menus: [...menus],
    }}),

    on(loadMenusError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);

export function menusReducer(state, action) {
    return _menusReducer(state, action);
}