import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NuverialCardContentDirective, NuverialSelectComponent } from '@dsg/shared/ui/nuverial';
import { FormioBaseCustomComponent } from '../../../base';
import { SelectSavedLocationFieldProperties } from '../models/formly-select-saved-location.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NuverialSelectComponent, NuverialCardContentDirective],
  selector: 'dsg-formio-select-saved-location',
  standalone: true,
  styleUrls: ['./formio-select-saved-location.component.scss'],
  templateUrl: './formio-select-saved-location.component.html',
})
export class FormioSelectSavedLocationComponent extends FormioBaseCustomComponent<string, SelectSavedLocationFieldProperties> {}
