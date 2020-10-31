import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(numbers: number[]) {
    return numbers.reduce((acc, val) => acc + val, 0);
  }
}
