import { TransportCost } from "./transport-cost";

export class PointsProduct {

    transportCost = new TransportCost();

    poinstP1(price: number, cost: number, quantityProdut = 1) {
        let resp: ObjetPoint = new ObjetPoint();
        let efecty = price * (2.6 / 100);
        let ivaEfecty = price * (2.6 / 100) * 19 / 100;
        let comisionBanco = price * (0.4 / 100);
        let industriaComencio = price * (0.8 / 100);
        let equipoDesrrollo = (price - cost) * 11 / 100;
        resp.priceUnit = price - efecty - ivaEfecty - comisionBanco - industriaComencio - cost -
            this.transportCost.transporteT1(quantityProdut) - equipoDesrrollo - 2000;

        resp.uma = resp.priceUnit / 8300;
        resp.porcGanan = (resp.priceUnit / cost) * 100;

        if (resp.porcGanan > 0) {
            if (resp.porcGanan < 200)
                resp.points = resp.uma * 3.5;
            else if (resp.porcGanan < 300)
                resp.points = resp.uma * 3.75;
            else if (resp.porcGanan < 500)
                resp.points = resp.uma * 4;
            else if (resp.porcGanan > 500)
                resp.points = resp.uma * 4.25;
        }

        return resp;
    }
}

export class ObjetPoint {
    points: number = 0;
    porcGanan: number = 0;
    uma: number = 0;
    priceUnit: number = 0
}