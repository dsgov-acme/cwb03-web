import { INuverialRadioCard } from '@dsg/shared/ui/nuverial';
import { BaseAdvancedFormlyFieldProperties } from '../../../base';

export interface CardsFieldProperties extends BaseAdvancedFormlyFieldProperties {
  value?: string;
  answers?: INuverialRadioCard[];
  formErrorLabel?: string;
}
