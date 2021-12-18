export class Discounts{
    public discountD1(quantity: number){
        let obj = [
            {quantity:1, descuento: 0},
            {quantity:2, descuento: 10},
            {quantity:3, descuento: 15},
            {quantity:4, descuento: 20},
            {quantity:5, descuento: 25},
            {quantity:6, descuento: 30},
            {quantity:7, descuento: 35},
            {quantity:9, descuento: 40},
            {quantity:14, descuento: 45},
            {quantity:50, descuento: 50}
        ];
        return obj.sort((a, b) => b.quantity - a.quantity).find(x => x.quantity <= quantity).descuento;
    }
}