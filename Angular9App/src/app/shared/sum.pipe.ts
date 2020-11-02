import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(numbers: (number | null)[]): number {
    return numbers
      .filter(value => value !== null)
      .map(value => value as number)
      .reduce((acc, val) => acc + val, 0);
  }
}
