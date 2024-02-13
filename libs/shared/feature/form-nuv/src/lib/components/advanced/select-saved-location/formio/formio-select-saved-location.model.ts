import { Injector } from '@angular/core';
import { FormioCustomComponentInfo, registerCustomFormioComponent } from '../../../../utils';
import {
  DEFAULT_COMPONENT_OPTIONS,
  defaultAriaLabelConfiguration,
  defaultColorThemeConfiguration,
  defaultCompleteConditionalPanelConfiguration,
  defaultDisplayAccessabilityPanel,
  defaultDisplayBasicConfiguration,
  defaultDisplayPanelConfiguration,
  defaultErrorMessagesPanelConfiguration,
  defaultFieldLabelConfiguration,
  defaultFieldWidthConfiguration,
  defaultPanelTabsConfiguration,
  defaultPlaceholderConfiguration,
  defaultPropertyKeyConfiguration,
  defaultRequiredConfiguration,
  defaultRequiredErrorMessageConfiguration,
  defaultValidationPanelConfiguration,
  defaultValidationPanelDocumentationLink,
} from '../../../base';
import { FormioSelectSavedLocationComponent } from './formio-select-saved-location.component';

/**
 * Formio custom component documentation links
 * Angular formio custom components https://github.com/formio/angular/wiki/Custom-Components-with-Angular-Elements#define-the-options
 * FormIO select configuration: https://formio.github.io/formio.js/docs/file/src/components/select/editForm/Select.edit.data.js.html
 * Form builder https://help.form.io/developers/form-builder#overriding-behavior
 * Form builder example json configurations https://formio.github.io/formio.js/app/examples/custombuilder.html
 */

const selector = 'nuverial-select-saved-location-wc';

const COMPONENT_OPTIONS: FormioCustomComponentInfo = {
  ...DEFAULT_COMPONENT_OPTIONS,
  editForm, // Optional: define the editForm of the field. Default: the editForm of a textfield
  group: 'nuverial', // Build Group
  icon: 'map', // Icon
  selector, // custom selector. Angular Elements will create a custom html tag with this selector
  title: 'Select Saved Location', // Title of the component
  type: 'nuverialSelectSavedLocation', // custom type. Formio will identify the field with this type.
  weight: 0, // Optional: define the weight in the builder group
};

export function registerSelectSavedLocationComponent(injector: Injector) {
  if (!customElements.get(selector)) {
    registerCustomFormioComponent(COMPONENT_OPTIONS, FormioSelectSavedLocationComponent, injector);
  }
}

function editForm() {
  return {
    components: [
      {
        // Tabs
        ...defaultPanelTabsConfiguration,
        components: [
          {
            // Display Panel
            ...defaultDisplayPanelConfiguration,
            components: [
              {
                ...defaultDisplayBasicConfiguration,
                components: [
                  { ...defaultFieldLabelConfiguration },
                  { ...defaultPropertyKeyConfiguration },
                  { ...defaultFieldWidthConfiguration },
                  { ...defaultColorThemeConfiguration },
                  { ...defaultPlaceholderConfiguration },
                  { ...selectAutocompleteConfig },
                  { ...PrefixIcon },
                  { ...SelectedOptionIconName },
                ],
              },
              {
                ...defaultDisplayAccessabilityPanel,
                components: [{ ...defaultAriaLabelConfiguration }],
              },
            ],
          },
          {
            // Validation Panel
            ...defaultValidationPanelConfiguration,
            components: [
              { ...defaultValidationPanelDocumentationLink },
              { ...defaultRequiredConfiguration },
              {
                ...defaultErrorMessagesPanelConfiguration,
                components: [{ ...defaultRequiredErrorMessageConfiguration }],
              },
            ],
          },
          {
            // Conditional Panel
            ...defaultCompleteConditionalPanelConfiguration,
          },
        ],
      },
    ],
  };
}

const PrefixIcon = {
  input: true,
  key: 'props.prefixIcon',
  label: 'Prefix Icon',
  placeholder: 'PrefixIcon',
  tooltip: 'Name of icon that may optionally be displayed at the start of the form input field. Supports named Material icons e.g. search_outlined.',
  type: 'input',
};

const SelectedOptionIconName = {
  input: true,
  key: 'props.selectedOptionIconName',
  label: 'Selected option icon name',
  placeholder: 'SelectedOptionIconName',
  tooltip: ' Dropdown menu icon name displayed if selected.',
  type: 'input',
};

const selectAutocompleteConfig = {
  ...defaultAriaLabelConfiguration,
  values: [
    {
      label: 'Country',
      value: 'country',
    },
    {
      label: 'State/Province',
      value: 'address-level1',
    },
    {
      label: 'Gender',
      value: 'sex',
    },
  ],
};
