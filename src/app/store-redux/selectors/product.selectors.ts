//import { productsSelectedState } from '../reducers/products-selected.reducer';
import { AppState } from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsSelectedState } from '../reducers';


export const getProductSelected = createFeatureSelector<productsSelectedState>(
    'productsSelected'
);

export const getProductCount = createSelector(
    getProductSelected,
    ({ loaded, products }) => {
        let productCount = 0;
        if (loaded) {
            productCount = products.length;
        } else {
            const productSelected = sessionStorage.getItem('products');
            if (productSelected) {
                productCount = JSON.parse(productSelected).length;
            }
        }
        return productCount;
    }
);