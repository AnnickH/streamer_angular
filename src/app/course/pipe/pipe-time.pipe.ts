import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeTime',
})
export class PipeTimePipe implements PipeTransform {
  transform(j: number, ...args: unknown[]): unknown {
    const minutes: number = Math.floor(j / 60);
    const second: number = j % 60;

    const extend: string = second < 9 ? '0' : '';
    return minutes + ' min ' + extend + second + ' s ';
  }
}
