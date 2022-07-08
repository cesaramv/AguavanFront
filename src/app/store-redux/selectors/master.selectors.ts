import {
    citiesState,
    DepartmentsState,
    DocumentsTypeState,
    ordersState,
    OrderStatesState,
    ProductsState,
    ProductCategoriesState,
    TaxesState,
    UsersState,
    UserStatesState
} from './../reducers/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getCitiesState = createFeatureSelector<citiesState>('cities');
export const getDepartmentsState = createFeatureSelector<DepartmentsState>('departments');
export const getDocumentsState = createFeatureSelector<DocumentsTypeState>('documentsType');
export const getProductsState = createFeatureSelector<ProductsState>('products');
export const getProductCategoriesState = createFeatureSelector<ProductCategoriesState>('productCategories');
export const getOrdersState = createFeatureSelector<ordersState>('orders');
export const getOrderStatesState = createFeatureSelector<OrderStatesState>('orderStates');
export const getTaxesState = createFeatureSelector<TaxesState>('taxes');
export const getUserStatesState = createFeatureSelector<UserStatesState>('userStates');
export const getUsersState = createFeatureSelector<UsersState>('users');

export const getDepartmentsSelector = createSelector(
    getDepartmentsState,
    ({ departments }) => departments
);

export const getCitiesSelector = createSelector(
    getCitiesState,
    ({ cities }) => cities
);

export const getUserStatesSelector = createSelector(
    getUserStatesState,
    ({ userStates }) => userStates
);

export const getDocumentsSelector = createSelector(
    getDocumentsState,
    ({ documentsType }) => documentsType
);

export const getProductCategoriesSelector = createSelector(
    getProductCategoriesState,
    ({ productCategories, loaded }) => {
        if (loaded) {
            return productCategories
        }
    }
);

export const getTaxesSelector = createSelector(
    getTaxesState,
    ({ taxes, loaded }) => {
        if (loaded) {
            return taxes
        }
    }
);

export const getDepartmentByIdSelector = createSelector(
    getDepartmentsState,
    ({ departments }, id: number) => departments.find(x => x.uid === id)
);

export const getCityByIdSelector = createSelector(
    getCitiesState,
    ({ cities }, id: number) => cities.find(x => x.uid === id)
);

export const getDocumentByIdSelector = createSelector(
    getDocumentsState,
    ({ documentsType }, id) => {
        return documentsType.find(x => x.uid === id)
    }
);

export const getProductByIdSelector = createSelector(
    getProductsState,
    ({ products }, id) => {
        return products.find(x => x.uid === id)
    }
);

export const getProductCategoryByIdSelector = createSelector(
    getProductCategoriesState,
    ({ productCategories }, id) => {
        return productCategories.find(x => x.uid === id)
    }
);

export const getOrderByIdSelector = createSelector(
    getOrdersState,
    ({ orders }, id) => {
        return orders.find(x => x.uid === id)
    }
);

export const getOrderStateByIdSelector = createSelector(
    getOrderStatesState,
    ({ orderStates }, id) => {
        return orderStates.find(x => x.uid === id)
    }
);

export const getTaxByIdSelector = createSelector(
    getTaxesState,
    ({ taxes }, id) => {
        return taxes.find(x => x.uid === id)
    }
);

export const getUserByIdSelector = createSelector(
    getUsersState,
    ({ users }, id) => {
        return users.find(x => x.uid === id)
    }
);

export const getUserStateByIdSelector = createSelector(
    getUserStatesState,
    ({ userStates }, id) => {
        return userStates.find(x => x.uid === id)
    }
);