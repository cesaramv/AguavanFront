import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noAplicaPipe'
})
export class NoAplicaPipe implements PipeTransform {

  transform(valor: string): any {
    return valor !== undefined && valor !== null && valor.length !== 0 ? valor : 'NA';
  }

}
