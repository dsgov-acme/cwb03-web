/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nuverialFormatDurationPipe',
  standalone: true,
})
export class FormatDurationPipe implements PipeTransform {
  public transform(startTime: number | undefined, endTime: number | undefined): string {
    if (!startTime || !endTime) {
      return '';
    }
    const durationSeconds = endTime - startTime;

    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);

    let durationString = '';

    if (hours > 0) {
      durationString += `${hours}h `;
    } else {
      durationString += '0h ';
    }

    if (minutes > 0 || durationString === '') {
      durationString += `${minutes}m`;
    }

    return durationString.trim();
  }
}
