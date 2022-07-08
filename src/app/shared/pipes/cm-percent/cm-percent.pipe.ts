import { PercentPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cmPercent'
})
export class CmPercentPipe implements PipeTransform {

  transform(value: number, digitsInfo: string): string {
    const percentPipe = new PercentPipe('es-CO');
    return percentPipe.transform(value, digitsInfo).replace(/\s/g, '');
  }

}
