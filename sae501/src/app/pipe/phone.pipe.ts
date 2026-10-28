import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.length >= 2) {
      return value.replace(/(\d{2})(?=\d)/g, '$1 ');
    }
    return value;
  }
}