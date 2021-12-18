
export class TransportCost {
    public transporteT1(quantity: number) {
        let cost = 0;
        if (quantity == 1) {
            cost = 11000;
        }
        else if (quantity == 2) {
            cost = 8000;
        }
        else if (quantity == 3) {
            cost = 7000;
        }
        else if (quantity == 4) {
            cost = 6000;
        }
        else if (quantity <= 14) {
            cost = 5000;
        }
        else {
            cost = 3500;
        }
        return cost;
    }
}