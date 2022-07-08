import { orderDetailState } from './../reducers/order-detail.reducer';
import { productsSelectedState } from './../reducers/products-selected.reducer';
import { DepartmentsState } from '../reducers/departments.reducer';
import { AppState } from '../app.reducer';
import { UserState } from '../reducers/user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ordersState } from '../reducers/orders.reducer';
import { ProductsState } from '../reducers/products.reducer';


export const getState = createFeatureSelector<ordersState>('orders');
export const getProductsSelected = createFeatureSelector<productsSelectedState>('productsSelected');
export const costTotal = (accumulator, currentValue) => accumulator + currentValue;

export const getStateOrderDetail = createFeatureSelector<orderDetailState>('orderDetail');
export const getProducts = createFeatureSelector<ProductsState>('products');

//TODO: este no tiene sentido, lo estoy utilizando para obtener order por id pero esta mal. Lo devo eliminar
export const getOrderById = createSelector(
  getState,
  ({ orders }) => orders
);

export const getProductSelected = createSelector(
  getProductsSelected,
  ({
    totalOrder,
    totalPoints,
    totalWeight,
    totalValorExcento,
    totalValorExcluido,

    totalBaseGravada19,
    totalBaseGravada5,
    totalIva19,
    totalIva5
  }) => ({
    totalOrder,
    totalPoints,
    totalWeight,
    totalValorExcento,
    totalValorExcluido: totalValorExcluido && 0,

    totalBaseGravada19,
    totalBaseGravada5,
    totalIva19,
    totalIva5
  })
);

export const getProductDetailSelected = createSelector(
  getProductsSelected,
  ({ products }) =>  products /* ({
    products: products.length > 0 ? [...products].sort((a, b) => a.productId - b.productId) : []
  }) //.length > 0 ? products.sort((a, b) => a.productId - b.productId) : [] */
);

export const getProductLoadingSelected = createSelector(
  getProductsSelected,
  ({ loading, loaded }) => !loading && !loaded
);

export const getOrderDetail = createSelector(
  getStateOrderDetail,
  ({ order }) => (order ?
    {
      ...order,
      totalOrder: order.subValor,
      totalValorExcento: order.vexcento,
      totalValorExcluido: order.vexcluido,
      totalWeight: order.weightTotal,
      totalPoints: order.points,
      totalBaseGravada19: order.baseSaved19,
      totalBaseGravada5: order.baseSaved5,
    } : null)
);

export const getProductByUid = createSelector(
  getProducts,
  ({ products, loaded }, uid) => loaded ? products.find(x => x.uid === uid) : null
);
/* export const getProductSelected = createSelector(
  getProductsSelected,
  ({
    totalOrder,
    totalPoints,
    totalWeight,
    totalValorExcento,
    totalValorExcluido,
    totalBaseGravada5,
    totalBaseGravada19,
    totalIva5,
    totalIva19,
    products
  }) => ({
    totalOrder,
    totalPoints,
    totalWeight,
    cost: products.map(x => x.cost * x.quantity).reduce(costTotal),
    totalBaseGravada5,
    totalBaseGravada19,
    totalIva5,
    totalIva19,
    valorExcento: totalValorExcento,
    valorExcluido: totalValorExcluido,
    products: products.length > 0 ? products.sort((a, b) => a.productId - b.productId) : [],

    stateOrder: 1,
    red: 1500,
    valorConsignacion: 3000,
    valorEnvio: 100,
    formatPay: 1,
    fechaLimitePago: DateUtil.stringToDate('23-10-2021')
  })
); */

/* export const getProductSelected = createSelector(
  getProductsSelected,
  ({ 
    totalOrder,
    totalPoints,
    totalWeight,
    totalBaseGravada5,
    totalBaseGravada19,
    totalIva5,
    totalIva19,
    totalValorExcento,
    totalValorExcluido,
    products
  }) => ({
    totalOrder, 
    totalPoints, 
    totalWeight,
    totalBaseGravada5,
    totalBaseGravada19,
    totalIva5,
    totalIva19,
    totalValorExcento,
    totalValorExcluido,
    products : products.length > 0 ? products.sort((a, b) => a.productId - b.productId) : []
  })
); */