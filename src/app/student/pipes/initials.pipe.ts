import { Pipe, PipeTransform } from '@angular/core';
import { IStudent } from '../interfaces/i-student';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  // implement une interface
  transform(value: IStudent, ...args: unknown[]): string {
    if (args[0] === 'lastNameFirst') {
      return value.lastName.charAt(0) + value.firstName!.charAt(0);
    }
    return value.firstName!.charAt(0) + value.lastName.charAt(0);
  }
}
