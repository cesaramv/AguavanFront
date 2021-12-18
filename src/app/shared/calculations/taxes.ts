export class Taxes{
    vExcento: number;
    vExcluido: number;
    totalIva: number;
    baseSaved: number;

    constructor(price: number, cost: number, quantity: number, taxRate: number){
       
        if(taxRate === 0){
            this.vExcento = price * quantity;
            this.totalIva = 0;
            this.baseSaved = 0;
        } else {
            this.vExcluido =  ((price - cost) * 85 / 100) * quantity;
            this.vExcento = 0;

            const impuesto = price * quantity;
            const iva = taxRate / 100;

            this.totalIva = (impuesto / (1 + iva)) * iva;
            this.baseSaved = (impuesto / (1 + iva));
        }
    }
}