import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyPipe'
})
export class EmptyPipe implements PipeTransform {

  transform(value: string): any {
    return value && value.length !== 0 ? value : '';
  }

}
