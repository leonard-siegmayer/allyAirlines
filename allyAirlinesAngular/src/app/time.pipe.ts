import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '@angular/common';

@Pipe({
  name: 'time'
})
/**
 * A pipe which formats the time in the (german) format 'hh:mm Uhr'.
 */
export class TimePipe implements PipeTransform {

  /**
   * Takes a time and formats it in the (german) format 'hh:mm Uhr'.
   * @param time The time required to be formatted
   * @returns the time formatted as string
   */
  transform(time: Time): string {
    let h = time.hours.toString();
    let m = time.minutes.toString();

    h = h.length === 1 ? '0' + h : h;
    m = m.length === 1 ? '0' + m : m;

    return `${h}:${m} Uhr`;
  }

}
