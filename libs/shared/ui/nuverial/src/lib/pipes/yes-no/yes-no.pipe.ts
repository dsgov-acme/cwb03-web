/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nuverialYesNoPipe',
  standalone: true,
})
export class NuverialYesNoPipe implements PipeTransform {
  public transform(value: any): any {
    if (typeof value === 'string') {
      if (value === 'true') {
        return 'Yes';
      } else if (value === 'false') {
        return 'No';
      }

      return value;
    }

    if (typeof value === 'boolean') {
      if (value) {
        return 'Yes';
      } else {
        return 'No';
      }
    }

    return value;
  }
}
