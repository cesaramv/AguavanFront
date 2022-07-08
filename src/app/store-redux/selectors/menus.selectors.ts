import { DepartmentsState } from '../reducers/departments.reducer';
import { AppState } from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenusState } from '../reducers';


export const getState = createFeatureSelector<MenusState>(
    'menus'
);

export const getMensuList = createSelector(
    getState,
    ({ loaded, menus }) => {
        if (loaded) {
            return ({ menus })
        }
    }
);