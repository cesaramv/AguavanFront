export class OrderModel {
    orderId: number;
    baseGravada19: number;
    baseGravada5: number;
    valorConsignacion: number;
    costo: number;
    fechaLimitePago: Date;
    fechaPago: Date;
    descuento: number;
    points: number;
    red: number;
    subValor: number;
    totalIva19: number;
    totalIva5: number;
    valorExcento: number;
    valorExcluido: number;
    valorEnvio: number;
    weightTotal: number;
    formatPay: number;
    stateOrder: number;
    users: number;
    pagoBonificacion: number;
    orderDetail: OrderDetailModel[] = [];
}

export class OrderDetailModel {
    orderDetailId?:number;
    product?: number;
    points?: number;
    quantity?: number;
    valorUnitarioDescuento?: number;
    baseSaved19?: number;
    baseSaved5?: number;
    cost?: number;
    price?: number;
    red?: number;
    taxRate?: number;
    totalIva19?: number;
    totalIva5?: number;
    vExcento?: number;
    vExcluido?: number;
    descuento: number;
    categoria: number;
    weightTotal: number;
}