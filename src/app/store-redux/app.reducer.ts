import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
    auth: reducers.AuthState,
    cities: reducers.citiesState,
    citiesBydepartment: reducers.citiesByDepartmentState,
    documentsType: reducers.DocumentsTypeState,
    departments: reducers.DepartmentsState,
    menus: reducers.MenusState,
    orderStates: reducers.OrderStatesState,
    orders: reducers.ordersState,
    orderDetail: reducers.orderDetailState,
    patrocinador: reducers.patrocinadorState,
    productCategories: reducers.ProductCategoriesState,
    productsSelected: reducers.productsSelectedState,
    products: reducers.ProductsState,
    taxes: reducers.TaxesState,
    userStates: reducers.UserStatesState,
    user: reducers.UserState,
    users: reducers.UsersState,
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: reducers.authReducer,
    cities: reducers.citiesReducer,
    citiesBydepartment: reducers.citiesByDepartmentReducer,
    documentsType: reducers.documentsTypeReducer,
    departments: reducers.departmentsReducer,
    menus: reducers.menusReducer,
    orderStates: reducers.orderStatesReducer,
    orders: reducers.ordersReducer,
    orderDetail: reducers.orderDetailReducer,
    patrocinador: reducers.patrocinadorReducer,
    productsSelected: reducers.productsSelectedReducer,
    productCategories: reducers.productCategoriesReducer,
    products: reducers.productsReducer,
    taxes: reducers.taxesReducer,
    userStates: reducers.userStatesReducer,
    user: reducers.userReducer,
    users: reducers.usersReducer,
}