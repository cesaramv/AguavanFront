import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
    users: reducers.UsersState,
    user: reducers.UserState,
    documentsType: reducers.DocumentsTypeState,
    departments: reducers.DepartmentsState,
    cities: reducers.citiesState,
    citiesBydepartment: reducers.citiesByDepartmentState,
    patrocinador: reducers.patrocinadorState,
    products: reducers.ProductsState,
    productsSelected: reducers.productsSelectedState,
    orders: reducers.ordersState,
    orderDetail: reducers.orderDetailState
}

export const appReducers: ActionReducerMap<AppState> = {
    users: reducers.usersReducer,
    user: reducers.userReducer,
    documentsType: reducers.documentsTypeReducer,
    departments: reducers.departmentsReducer,
    cities: reducers.citiesReducer,
    citiesBydepartment: reducers.citiesByDepartmentReducer,
    patrocinador: reducers.patrocinadorReducer,
    products: reducers.productsReducer,
    productsSelected: reducers.productsSelectedReducer,
    orders: reducers.ordersReducer,
    orderDetail: reducers.orderDetailReducer
}