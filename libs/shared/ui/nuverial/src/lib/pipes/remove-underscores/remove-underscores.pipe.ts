/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nuverialRemoveUnderscoresPipe',
  standalone: true,
})
export class NuverialRemoveUnderscoresPipe implements PipeTransform {
  public transform(value: any): any {
    if (!value || typeof value !== 'string') {
      return value;
    }

    return value.replace('_', ' ');
  }
}
