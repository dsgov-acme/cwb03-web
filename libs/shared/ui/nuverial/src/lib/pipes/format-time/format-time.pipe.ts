/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nuverialFormatTimePipe',
  standalone: true,
})
export class FormatTimePipe implements PipeTransform {
  public transform(value: number | undefined): string {
    if (!value) {
      return 'Not Available';
    }
    const milliseconds = value * 1000;
    const date = new Date(milliseconds);

    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      hour12: true,
      minute: '2-digit',
      timeZone: 'America/New_York',
    };

    return date.toLocaleString('en-US', options);
  }
}
