import { Taxes } from './../../shared/calculations/taxes';
import { Discounts } from './../../shared/calculations/discounts';
import { createReducer, on } from '@ngrx/store';
import { loadProductSelected, removeProductSelected, addProductSelected, loadProductSelectedError } from '../actions';
import { PointsProduct } from '@shared/calculations/points-product';

export interface productsSelectedState {
    loaded: boolean,
    loading: boolean,
    products: any[];
    totalOrder: number;
    totalPoints: number;
    totalWeight: number;
    totalBaseGravada19: number;
    totalBaseGravada5: number;
    totalIva19: number;
    totalIva5: number;
    totalValorExcento: number;
    totalValorExcluido: number;
    filtros: any;
}

export const productsSelectedInitialState: productsSelectedState = {
    loaded: false,
    loading: false,
    products: [],
    totalOrder: 0,
    totalPoints: 0,
    totalWeight: 0,
    totalBaseGravada19: 0,
    totalBaseGravada5: 0,
    totalIva19: 0,
    totalIva5: 0,
    totalValorExcento: 0,
    totalValorExcluido: 0,
    filtros: null
}

let discounts = new Discounts();
const pointsProduct = new PointsProduct();

const _quantity = (accumulator, currentValue) => accumulator + currentValue;

const _productsSelectedReducer = createReducer(productsSelectedInitialState,

    /* on(loadProductSelected, (state, { product }) => {
        if (!state.products.find(x => x.productId === product.productId)) {
            const _products = buildObjctProducts(state.products, product);
            sessionStorageProduct(_products);
            return { 
                ...state, 
                loading: true,
                ...headerDetaildProduct(_products) 
            };
        }
        return state;
    }), */

    on(loadProductSelected, (state, { product }) => ({ ...state, loading: true, filtros: product })),

    on(removeProductSelected, (state, { product }) => {
        const _products = [...state.products.filter(x => x.productId !== product.productId)];
        const _totalQuantity = _products.map(x => x.quantity).reduce(_quantity);
        const _discount = discounts.discountD1(_totalQuantity);

        const products = _products.map(x => {
            const _discountedUnitValue = x.price - (x.price * _discount / 100);
            const taxes = new Taxes(x.price, x.cost, x.quantity, x.tax.rate);
            return {
                ...x,
                discount: _discount,
                discountedUnitValue: _discountedUnitValue,
                totalPoints: pointsProduct.poinstP1(x.price, x.cost, _totalQuantity).points,
                totalValue: _discountedUnitValue * x.quantity,
                vExcento: taxes.vExcento,
                vExcluido: taxes.vExcluido,
                baseSave5: x.tax.rate === 5 ? taxes.baseSaved : 0,
                totalIva5: x.tax.rate === 5 ? taxes.totalIva : 0,
                baseSave19: x.tax.rate !== 5 ? taxes.baseSaved : 0,
                totalIva19: x.tax.rate !== 5 ? taxes.totalIva : 0,
            };
        });

        sessionStorageProduct(products);
        return {
            ...state,
            loading: false,
            loaded: true,
            ...headerDetaildProduct(products)
        };

    }),

    on(addProductSelected, (state, { product }) => {
        let products = []; //state.products.length > 0 ? state.products : product;
        if(state.products.length > 0){
            products = state.products.filter(x => product.find(t => t.productId !== x.productId) );
            products = [...products, ...product];
        }else{
            products = product;
        }
        products.forEach(item => {
            products = [...buildObjctProducts(products, item)];
        });

        sessionStorageProduct(products);
        return {
            ...state,
            loading: false,
            loaded: true,
            ...headerDetaildProduct(products)
        };

    }),

    on(loadProductSelectedError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    }))
);

function sessionStorageProduct(_products: any) {
    sessionStorage.setItem('products', JSON.stringify(_products.map(x => {
        return { code: x.productId, quantity: x.quantity }
    })));
}

function buildObjctProducts(products: any, productAdd: any) {
    const _totalQuantity = totalQuantityProducts(products, productAdd);
    const _discount = discounts.discountD1(_totalQuantity);
    const _discountedUnitValue = productAdd.price - (productAdd.price * _discount / 100);
    const taxes = new Taxes(productAdd.price, productAdd.cost, productAdd.quantity, productAdd.tax.rate);
    return [
        ...products.filter(x => x.productId !== productAdd.productId),
        {
            ...productAdd,
            discount: _discount,
            discountedUnitValue: _discountedUnitValue,
            totalPoints: pointsProduct.poinstP1(productAdd.price, productAdd.cost, _totalQuantity).points,
            totalValue: _discountedUnitValue * productAdd.quantity,
            vExcento: taxes.vExcento,
            vExcluido: taxes.vExcluido,
            baseSave5: productAdd.tax.rate === 5 ? taxes.baseSaved : 0,
            totalIva5: productAdd.tax.rate === 5 ? taxes.totalIva : 0,
            baseSave19: productAdd.tax.rate !== 5 ? taxes.baseSaved : 0,
            totalIva19: productAdd.tax.rate !== 5 ? taxes.totalIva : 0,
        }
    ];
}

function totalQuantityProducts(products: any, productAdd: any) {
    let _totalQuantity = 0;
    if (products.length > 1) {
        const _productExist = products.filter(x => x.productId !== productAdd.productId);
        _totalQuantity = productAdd.quantity + (_productExist.map(x => x.quantity).reduce(_quantity));
    } else {
        _totalQuantity = productAdd.quantity;
    }

    return _totalQuantity;
}

function headerDetaildProduct(products: any) {
    return {
        products: products,
        totalOrder: products.map(x => x.totalValue).reduce(_quantity),
        totalPoints: products.map(x => x.totalPoints).reduce(_quantity),
        totalWeight: products.map(x => x.weight).reduce(_quantity) + products.map(x => x.weightContainer).reduce(_quantity),
        totalBaseGravada19: products.map(x => x.baseSave19).reduce(_quantity),
        totalBaseGravada5: products.map(x => x.baseSave5).reduce(_quantity),
        totalIva19: products.map(x => x.totalIva19).reduce(_quantity),
        totalIva5: products.map(x => x.totalIva5).reduce(_quantity),
        totalValorExcento: products.map(x => x.vExcento ?? 0).reduce(_quantity),
        totalValorExcluido: products.map(x => x.vExcluido ?? 0).reduce(_quantity),
    };
}

export function productsSelectedReducer(state, action) {
    return _productsSelectedReducer(state, action);
}