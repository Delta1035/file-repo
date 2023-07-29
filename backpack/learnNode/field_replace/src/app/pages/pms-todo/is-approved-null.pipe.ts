import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isApprovedNull'
})
export class IsApprovedNullPipe implements PipeTransform {

  transform(value: string, args?: any): boolean {
    return !value;
  }

}
