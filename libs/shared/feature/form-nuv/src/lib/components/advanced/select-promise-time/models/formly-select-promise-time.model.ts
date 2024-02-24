import { INuverialRadioCard } from '@dsg/shared/ui/nuverial';
import { BaseAdvancedFormlyFieldProperties } from '../../../base';

export interface SelectPromiseTimeProperties extends BaseAdvancedFormlyFieldProperties {
  value?: string;
  selectOptions?: INuverialRadioCard[];
  formErrorLabel?: string;
}
