import { Injectable } from '@angular/core';

@Injectable()
export class CalculationService {

  constructor() { }

  getPoint(price: any, cost: any, quantity: number) {
    price = parseFloat(price);
    cost = parseFloat(cost);
    const efecty = price * (2.6 / 100);
    const ivaEfecty = price * (2.6 / 100) * 19 / 100;
    const comisionBanco = price * (0.4 / 100);
    const industriaComencio = price * (0.8 / 100);
    const equipoDesrrollo = (price - cost) * 10 / 100;

    const priceUnit = price - efecty - ivaEfecty - comisionBanco - industriaComencio -
      cost - this.costTransporte(quantity) - equipoDesrrollo;

    const uma = priceUnit / 8300;
    let porcGenan = (priceUnit / cost) * 100;
    let point = 0;
    if (porcGenan > 0) {
      if (porcGenan < 200)
        point = uma * 3.5;
      else if (porcGenan < 300)
        point = uma * 3.75;
      else if (porcGenan < 500)
        point = uma * 4;
      else if (porcGenan > 500)
        point = uma * 4.25;
    }
    else
      porcGenan = 0;

    return {point: point.toFixed(2), priceUnit, uma, porcGenan};
  }

  private costTransporte(quantity: number) {
    let cost: any = 0;
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
    else {
      cost = 5000;
    }
    return cost;
  }
}
