import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativedate'
})
/**
 * Formats a date into a relative representation. (German only)
 * If the date is less than two days away from today, it returns either 'Heute', 'Morgen' or 'Gestern'.
 * If the date is more than one year away from today, it returns either 'In mehr als einem Jahr' or 'Vor mehr als einem Jahr'.
 * Otherwise, it returns a string describing the relative date in number of days.
 */
export class RelativedatePipe implements PipeTransform {

  /**
   * Formats a date into a relative representation.
   * @param dateAsString The date to be formatted as string.
   */
  transform(dateAsString: string): string {
    const today = new Date();
    const date = new Date(dateAsString);
    const currentDate = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
    const givenDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    const difference = Math.floor((givenDate - currentDate) / (1000 * 60 * 60 * 24));
    // If the day is less than 2 days away from today.
    switch (difference) {
      case 0:
        return 'Heute';
      case 1:
        return 'Morgen';
      case -1:
        return 'Gestern';
    }
    // If the day is years from today.
    if (difference > 365) {
      return 'In mehr als einem Jahr';
    } else if (difference < -365) {
      return 'Vor mehr als einem Jahr';
    }
    // Otherwise return the number of days.
    return difference >= 0 ? `In ${difference} Tagen` : `Vor ${difference * -1} Tagen`;
  }

}
