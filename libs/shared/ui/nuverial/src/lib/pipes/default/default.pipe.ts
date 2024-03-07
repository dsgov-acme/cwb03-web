import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nuverialDefault',
  standalone: true,
})
export class NuverialDefaultPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public transform(value: any, defaultString = '--'): string | any {
    if (!value) {
      return defaultString;
    }

    return value;
  }
}
