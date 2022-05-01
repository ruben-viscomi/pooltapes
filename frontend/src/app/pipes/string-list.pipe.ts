import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringList'
})
export class StringListPipe implements PipeTransform {

  transform(values: string[], ...args: unknown[]): string {
    var returnValue: string = '';
    for (let i = 0; i < values.length; i++) {
      let separator: string = (i < values.length - 1) ? ', ' : '';
      returnValue += values[i] + separator;
    }

    return returnValue;
  }

}
