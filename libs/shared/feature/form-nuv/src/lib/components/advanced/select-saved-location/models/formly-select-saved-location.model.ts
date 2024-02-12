import { INuverialSelectOption } from '@dsg/shared/ui/nuverial';
import { BaseAdvancedFormlyFieldProperties } from '../../../base';

export interface SelectSavedLocationFieldProperties extends BaseAdvancedFormlyFieldProperties {
  selectOptions: INuverialSelectOption[];
}

export interface CommonAddress {
  address1?: string;
  address2?: string;
  city?: string;
  stateCode?: string;
  postalCode?: string;
  postalCodeExtension?: string;
  countryCode?: string;
}

export interface MTALocation {
  id?: string;
  name?: string;
  locationType?: LocationType;
  latitude?: number;
  longitude?: number;
  address?: CommonAddress;
}

export enum LocationType {
  SavedLocation = 'SAVED_LOCATION',
  CustomLocation = 'CUSTOM_LOCATION',
}
