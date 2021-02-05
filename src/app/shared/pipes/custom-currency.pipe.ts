import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor(private readonly currencyPipe: CurrencyPipe){}

  transform(valor: number): any {
    return this.currencyPipe.transform(valor ? valor: 0, 'COP', 'symbol', '1.0-0');
  }

  transformNumericoDecimal(valor: number): any {
    return this.currencyPipe.transform(valor ? valor : 0, 'COP', '', '3.2-2');
  }

  transformDecimal(valor: number): any {
    return this.currencyPipe.transform(valor ? valor : 0, 'COP', 'symbol', '3.2-2');
  }
}
