import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NuverialSelectComponent, NuverialYesNoPipe } from '@dsg/shared/ui/nuverial';
import { FormlyModule } from '@ngx-formly/core';

import { FormlyBaseComponent } from '../../base';
import { SelectFieldProperties } from '../models/formly-select.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormlyModule, NuverialSelectComponent, NuverialYesNoPipe],
  selector: 'dsg-formly-select',
  standalone: true,
  styleUrls: ['./formly-select.component.scss'],
  templateUrl: './formly-select.component.html',
})
export class FormlySelectComponent extends FormlyBaseComponent<SelectFieldProperties> {
  public get hasMultipleValues(): boolean {
    return this.formControl.value && Array.isArray(this.formControl.value);
  }

  public get displayTextValue(): string | undefined {
    if (!this.hasMultipleValues) {
      return this.props.selectOptions?.find(opt => opt.key === this.formControl.value)?.displayTextValue;
    }

    return undefined;
  }
  public get displayTextValueMultiple(): string[] | undefined {
    if (this.hasMultipleValues) {
      return this.props.selectOptions?.filter(opt => Array.from(this.formControl.value).indexOf(opt.key) > -1).map(opt => opt.displayTextValue);
    }

    return [];
  }

  public trackByFn(index: number): number {
    return index;
  }
}
