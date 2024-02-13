import { Injector } from '@angular/core';
import { FormioCustomComponentInfo, registerCustomFormioComponent } from '../../../../utils';
import {
  DEFAULT_COMPONENT_OPTIONS,
  defaultColorThemeConfiguration,
  defaultCompleteConditionalPanelConfiguration,
  defaultDisplayBasicConfiguration,
  defaultDisplayPanelConfiguration,
  defaultErrorMessagesPanelConfiguration,
  defaultFieldWidthConfiguration,
  defaultPanelTabsConfiguration,
  defaultPropertyKeyConfiguration,
  defaultRequiredConfiguration,
  defaultRequiredErrorMessageConfiguration,
  defaultValidationPanelConfiguration,
  defaultValidationPanelDocumentationLink,
} from '../../../base';
import { FormioSelectPromiseTimeComponent } from './formio-select-promise-time.component';

/**
 * Formio custom component documentation links
 * Angular formio custom components https://github.com/formio/angular/wiki/Custom-Components-with-Angular-Elements#define-the-options
 * Form builder https://help.form.io/developers/form-builder#overriding-behavior
 * Form builder example json configurations https://formio.github.io/formio.js/app/examples/custombuilder.html
 */

const selector = 'nuverial-select-promise-time-wc';

const COMPONENT_OPTIONS: FormioCustomComponentInfo = {
  ...DEFAULT_COMPONENT_OPTIONS,
  editForm, // Optional: define the editForm of the field. Default: the editForm of a textfield
  group: 'nuverial', // Build Group
  icon: 'time', // Icon
  selector, // custom selector. Angular Elements will create a custom html tag with this selector
  title: 'Select Promise Time', // Title of the component
  type: 'nuverialSelectPromiseTime', // custom type. Formio will identify the field with this type.
  weight: 0, // Optional: define the weight in the builder group
};

export function registerSelectPromiseTimeComponent(injector: Injector) {
  if (!customElements.get(selector)) {
    registerCustomFormioComponent(COMPONENT_OPTIONS, FormioSelectPromiseTimeComponent, injector);
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
                  { ...cardQuestionConfiguration },
                  { ...defaultPropertyKeyConfiguration },
                  { ...defaultColorThemeConfiguration },
                  { ...defaultFieldWidthConfiguration },
                  { ...cardColumnsConfiguration },
                ],
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
              { ...formErrorLabelConfiguration },
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

const cardQuestionConfiguration = {
  input: true,
  inputType: 'text',
  key: 'props.label',
  label: 'Question',
  placeholder: 'Question',
  type: 'textfield',
  validate: {
    required: true,
  },
};

const formErrorLabelConfiguration = {
  input: true,
  inputType: 'text',
  key: 'props.formErrorLabel',
  label: 'Form error label',
  placeholder: 'Form error label',
  tooltip: 'Customize the error label displayed at the top of the intake form when proceeding to the next step with a field error.',
  type: 'textfield',
};

const cardColumnsConfiguration = {
  defaultValue: 2,
  input: true,
  inputFormat: 'plain',
  key: 'props.cols',
  label: 'Answers per row',
  tooltip: 'Determines the number of answers per row',
  type: 'number',
  validate: {
    integer: true,
    min: 1,
    required: true,
  },
  weight: 0,
};
