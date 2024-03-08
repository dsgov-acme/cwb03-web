/* eslint-disable @typescript-eslint/no-explicit-any */
import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nuverialSafeTitlecasePipe',
  standalone: true,
})
export class NuverialSafeTitlecasePipe implements PipeTransform {
  constructor(private readonly _titlecasePipe: TitleCasePipe) {}

  public transform(value: any): any {
    if (!value) {
      return value;
    }

    if (typeof value === 'string') {
      return this._titlecasePipe.transform(value);
    }

    return value;
  }
}
