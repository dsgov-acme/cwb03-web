import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INuverialSelectOption, NuverialSectionHeaderComponent, NuverialTextInputComponent } from '@dsg/shared/ui/nuverial';
import { FormlyExtension, FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBaseComponent, defaultPrePopulateAdvancedComponent, isPrePopulated } from '../../../base';
import { FormlyGoogleMapsAutocompleteComponent } from '../google-maps-autocomplete/formly-google-maps-autocomplete/formly-google-maps-autocomplete.component';
import { GooglePlace } from '../models/googleplaces.api.model';
import { FormlyAddressFieldProperties } from './formly-address.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormlyModule, NuverialSectionHeaderComponent, FormlyGoogleMapsAutocompleteComponent, NuverialTextInputComponent],
  selector: 'dsg-formly-address',
  standalone: true,
  styleUrls: ['./formly-address.component.scss'],
  templateUrl: './formly-address.component.html',
})
export class FormlyAddressComponent extends FormlyBaseComponent<FormlyAddressFieldProperties> implements FormlyExtension, OnInit {
  public countrySelectLabels = new Map();
  public reviewDetailsMap = new Map<string, string>();

  public get reviewDetails() {
    this.reviewDetailsMap.set('countryLabel', this.countrySelectLabels.get(this.reviewDetailsMap.get('countryCode')));
    const model = Object.fromEntries(this.reviewDetailsMap);

    return model;
  }

  public prePopulate(field: FormlyFieldConfig<FormlyAddressFieldProperties>): void {
    if (isPrePopulated(field)) return;

    defaultPrePopulateAdvancedComponent(field);

    const labelField: FormlyFieldConfig = {
      className: 'flex-full',
      props: {
        label: field.props?.label,
      },
      type: 'nuverialSectionHeader',
    };

    const fieldGroup = [field.props?.label ? labelField : {}, ...(field.fieldGroup || [])].map(_field => {
      return this._populateAddressConfiguration(_field, field);
    });

    field.fieldGroup = fieldGroup;
  }

  public ngOnInit(): void {
    this.field.fieldGroup?.forEach(field => {
      this.reviewDetailsMap.set(field.props?.['componentId'], this.form.get(field?.key?.toString() || '')?.value);
    });
    this.field.fieldGroup
      ?.find(field => field.props?.['componentId'] === 'countryCode')
      ?.props?.['selectOptions']?.forEach((option: INuverialSelectOption) => this.countrySelectLabels.set(option.key, option.displayTextValue));
  }

  public trackByFn(_index: number, item: FormlyFieldConfig) {
    return item.id;
  }

  private _populateAddressConfiguration(_field: FormlyFieldConfig, field: FormlyFieldConfig<FormlyAddressFieldProperties>): FormlyFieldConfig {
    const componentId = _field.props?.['componentId'];

    if (componentId === 'addressLine1') {
      return this._populateAddressLine1(_field, field);
    } else if (componentId === 'addressLine2') {
      return this._processAddressField(_field, 'address-line2');
    } else if (componentId === 'city') {
      return this._processAddressField(_field, 'address-level2');
    } else if (componentId === 'stateCode') {
      return this._processAddressField(_field, 'address-level1');
    } else if (componentId === 'postalCode') {
      return this._processAddressField(_field, 'postal-code', 'flex-quarter');
    } else if (componentId === 'postalCodeExtension') {
      return this._processAddressField(_field, undefined, 'flex-quarter');
    } else if (componentId === 'countryCode') {
      return this._processAddressField(_field, 'address-line2');
    } else if (componentId === 'gbpPlacesId') {
      return this._processAddressField(_field, 'gbpPlacesId');
    } else {
      return _field;
    }
  }

  private _populateAddressLine1(_field: FormlyFieldConfig, field: FormlyFieldConfig<FormlyAddressFieldProperties>): FormlyFieldConfig {
    return {
      ..._field,
      className: 'flex-half',
      props: {
        ..._field.props,
        autocomplete: 'address-line1',
        ...(field.props?.addressValidationEnabled && {
          gotGoogleAddress: (address: GooglePlace) => this._gotGoogleAddress(address, field),
        }),
        type: 'text',
      },
      type: field.props?.addressValidationEnabled ? 'nuverialGoogleMapsAutocomplete' : 'nuverialTextInput',
    };
  }

  private _gotGoogleAddress(address: GooglePlace, field: FormlyFieldConfig<FormlyAddressFieldProperties>) {
    if (!address) return;

    field.fieldGroup?.forEach(formField => {
      const componentId: string = formField.props?.['componentId'];

      if (!componentId) return;

      formField.formControl?.setValue(address[componentId as keyof GooglePlace]);
    });
  }

  private _processAddressField(_field: FormlyFieldConfig, autocomplete?: string, className = 'flex-half'): FormlyFieldConfig {
    return {
      ..._field,
      className,
      props: {
        ..._field.props,
        ...(autocomplete ? { autocomplete } : {}),
        type: 'text',
      },
      type: 'nuverialTextInput',
    };
  }
}
