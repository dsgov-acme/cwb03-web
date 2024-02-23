/* eslint-disable sort-keys */
import { FormConfigurationModel } from '@dsg/shared/data-access/work-api';

export const riderReviewFormConfiguration: FormConfigurationModel = new FormConfigurationModel(
  [
    {
      components: [
        {
          className: 'flex-half',
          input: true,
          key: 'fullName',
          props: {
            label: 'Name',
            type: 'text',
          },
          type: 'nuverialTextInput',
        },
        {
          className: 'flex-half',
          components: [
            {
              key: 'primaryPickupAddress.address.addressLine1',
              input: true,
              props: {
                label: 'Address Line 1',
                required: true,
                componentId: 'addressLine1',
              },
            },
            {
              key: 'primaryPickupAddress.address.addressLine2',
              input: true,
              props: {
                label: 'Address Line 2 (optional)',
                componentId: 'addressLine2',
              },
            },
            {
              key: 'primaryPickupAddress.address.city',
              input: true,
              props: {
                label: 'City',
                required: true,
                componentId: 'city',
              },
            },
            {
              key: 'primaryPickupAddress.address.stateCode',
              input: true,
              props: {
                label: 'State',
                required: true,
                componentId: 'stateCode',
                selectOptions: [
                  {
                    key: 'AL',
                    displayTextValue: 'Alabama',
                  },
                  {
                    key: 'AK',
                    displayTextValue: 'Alaska',
                  },
                  {
                    key: 'AS',
                    displayTextValue: 'American Samoa',
                  },
                  {
                    key: 'AZ',
                    displayTextValue: 'Arizona',
                  },
                  {
                    key: 'AR',
                    displayTextValue: 'Arkansas',
                  },
                  {
                    key: 'CA',
                    displayTextValue: 'California',
                  },
                  {
                    key: 'CO',
                    displayTextValue: 'Colorado',
                  },
                  {
                    key: 'CT',
                    displayTextValue: 'Connecticut',
                  },
                  {
                    key: 'DE',
                    displayTextValue: 'Delaware',
                  },
                  {
                    key: 'DC',
                    displayTextValue: 'District Of Columbia',
                  },
                  {
                    key: 'FM',
                    displayTextValue: 'Federated States Of Micronesia',
                  },
                  {
                    key: 'FL',
                    displayTextValue: 'Florida',
                  },
                  {
                    key: 'GA',
                    displayTextValue: 'Georgia',
                  },
                  {
                    key: 'GU',
                    displayTextValue: 'Guam',
                  },
                  {
                    key: 'HI',
                    displayTextValue: 'Hawaii',
                  },
                  {
                    key: 'ID',
                    displayTextValue: 'Idaho',
                  },
                  {
                    key: 'IL',
                    displayTextValue: 'Illinois',
                  },
                  {
                    key: 'IN',
                    displayTextValue: 'Indiana',
                  },
                  {
                    key: 'IA',
                    displayTextValue: 'Iowa',
                  },
                  {
                    key: 'KS',
                    displayTextValue: 'Kansas',
                  },
                  {
                    key: 'KY',
                    displayTextValue: 'Kentucky',
                  },
                  {
                    key: 'LA',
                    displayTextValue: 'Louisiana',
                  },
                  {
                    key: 'ME',
                    displayTextValue: 'Maine',
                  },
                  {
                    key: 'MH',
                    displayTextValue: 'Marshall Islands',
                  },
                  {
                    key: 'MD',
                    displayTextValue: 'Maryland',
                  },
                  {
                    key: 'MA',
                    displayTextValue: 'Massachusetts',
                  },
                  {
                    key: 'MI',
                    displayTextValue: 'Michigan',
                  },
                  {
                    key: 'MN',
                    displayTextValue: 'Minnesota',
                  },
                  {
                    key: 'MS',
                    displayTextValue: 'Mississippi',
                  },
                  {
                    key: 'MO',
                    displayTextValue: 'Missouri',
                  },
                  {
                    key: 'MT',
                    displayTextValue: 'Montana',
                  },
                  {
                    key: 'NE',
                    displayTextValue: 'Nebraska',
                  },
                  {
                    key: 'NV',
                    displayTextValue: 'Nevada',
                  },
                  {
                    key: 'NH',
                    displayTextValue: 'New Hampshire',
                  },
                  {
                    key: 'NJ',
                    displayTextValue: 'New Jersey',
                  },
                  {
                    key: 'NM',
                    displayTextValue: 'New Mexico',
                  },
                  {
                    key: 'NY',
                    displayTextValue: 'New York',
                  },
                  {
                    key: 'NC',
                    displayTextValue: 'North Carolina',
                  },
                  {
                    key: 'ND',
                    displayTextValue: 'North Dakota',
                  },
                  {
                    key: 'MP',
                    displayTextValue: 'Northern Mariana Islands',
                  },
                  {
                    key: 'OH',
                    displayTextValue: 'Ohio',
                  },
                  {
                    key: 'OK',
                    displayTextValue: 'Oklahoma',
                  },
                  {
                    key: 'OR',
                    displayTextValue: 'Oregon',
                  },
                  {
                    key: 'PW',
                    displayTextValue: 'Palau',
                  },
                  {
                    key: 'PA',
                    displayTextValue: 'Pennsylvania',
                  },
                  {
                    key: 'PR',
                    displayTextValue: 'Puerto Rico',
                  },
                  {
                    key: 'RI',
                    displayTextValue: 'Rhode Island',
                  },
                  {
                    key: 'SC',
                    displayTextValue: 'South Carolina',
                  },
                  {
                    key: 'SD',
                    displayTextValue: 'South Dakota',
                  },
                  {
                    key: 'TN',
                    displayTextValue: 'Tennessee',
                  },
                  {
                    key: 'TX',
                    displayTextValue: 'Texas',
                  },
                  {
                    key: 'UT',
                    displayTextValue: 'Utah',
                  },
                  {
                    key: 'VT',
                    displayTextValue: 'Vermont',
                  },
                  {
                    key: 'VI',
                    displayTextValue: 'Virgin Islands',
                  },
                  {
                    key: 'VA',
                    displayTextValue: 'Virginia',
                  },
                  {
                    key: 'WA',
                    displayTextValue: 'Washington',
                  },
                  {
                    key: 'WV',
                    displayTextValue: 'West Virginia',
                  },
                  {
                    key: 'WI',
                    displayTextValue: 'Wisconsin',
                  },
                  {
                    key: 'WY',
                    displayTextValue: 'Wyoming',
                  },
                ],
              },
            },
            {
              key: 'primaryPickupAddress.address.postalCode',
              input: true,
              props: {
                label: 'Zip Code',
                required: true,
                componentId: 'postalCode',
              },
            },
            {
              key: 'primaryPickupAddress.address.postalCodeExtension',
              input: true,
              props: {
                label: 'Ext. (Optional)',
                componentId: 'postalCodeExtension',
              },
            },
            {
              key: 'primaryPickupAddress.address.countryCode',
              input: true,
              props: {
                label: 'Country',
                required: true,
                componentId: 'countryCode',
                selectOptions: [
                  {
                    key: 'US',
                    displayTextValue: 'United States',
                  },
                  {
                    key: 'CA',
                    displayTextValue: 'Canada',
                  },
                  {
                    key: 'MX',
                    displayTextValue: 'Mexico',
                  },
                ],
              },
            },
            {
              key: 'primaryPickupAddress.placeId',
              hide: true,
              input: true,
              props: {
                label: 'Place ID',
                hidden: true,
                componentId: 'gbpPlacesId',
              },
            },
          ],
          props: {
            label: 'Primary Pickup Address',
          },
          key: 'address',
          type: 'nuverialAddress',
          input: true,
        },
        {
          key: 'dateOfBirth',
          type: 'nuverialDatePicker',
          input: true,
          props: {
            label: 'Date of Birth',
            startView: 'month',
            colorTheme: 'primary',
            validationType: 'absolute',
          },
          className: 'flex-half',
        },
        {
          props: {
            label: 'Home Address',
          },
          className: 'flex-half',
          components: [
            {
              input: true,
              props: {
                componentId: 'addressLine1',
                label: 'Address Line 1',
                required: true,
              },
              key: 'homeAddress.address.addressLine1',
            },
            {
              input: true,
              props: {
                componentId: 'addressLine2',
                label: 'Address Line 2 (optional)',
              },
              key: 'homeAddress.address.addressLine2',
            },
            {
              input: true,
              props: {
                componentId: 'city',
                label: 'City',
                required: true,
              },
              key: 'homeAddress.address.city',
            },
            {
              input: true,
              props: {
                componentId: 'stateCode',
                label: 'State',
                required: true,
                selectOptions: [
                  {
                    displayTextValue: 'Alabama',
                    key: 'AL',
                  },
                  {
                    displayTextValue: 'Alaska',
                    key: 'AK',
                  },
                  {
                    displayTextValue: 'American Samoa',
                    key: 'AS',
                  },
                  {
                    displayTextValue: 'Arizona',
                    key: 'AZ',
                  },
                  {
                    displayTextValue: 'Arkansas',
                    key: 'AR',
                  },
                  {
                    displayTextValue: 'California',
                    key: 'CA',
                  },
                  {
                    displayTextValue: 'Colorado',
                    key: 'CO',
                  },
                  {
                    displayTextValue: 'Connecticut',
                    key: 'CT',
                  },
                  {
                    displayTextValue: 'Delaware',
                    key: 'DE',
                  },
                  {
                    displayTextValue: 'District Of Columbia',
                    key: 'DC',
                  },
                  {
                    displayTextValue: 'Federated States Of Micronesia',
                    key: 'FM',
                  },
                  {
                    displayTextValue: 'Florida',
                    key: 'FL',
                  },
                  {
                    displayTextValue: 'Georgia',
                    key: 'GA',
                  },
                  {
                    displayTextValue: 'Guam',
                    key: 'GU',
                  },
                  {
                    displayTextValue: 'Hawaii',
                    key: 'HI',
                  },
                  {
                    displayTextValue: 'Idaho',
                    key: 'ID',
                  },
                  {
                    displayTextValue: 'Illinois',
                    key: 'IL',
                  },
                  {
                    displayTextValue: 'Indiana',
                    key: 'IN',
                  },
                  {
                    displayTextValue: 'Iowa',
                    key: 'IA',
                  },
                  {
                    displayTextValue: 'Kansas',
                    key: 'KS',
                  },
                  {
                    displayTextValue: 'Kentucky',
                    key: 'KY',
                  },
                  {
                    displayTextValue: 'Louisiana',
                    key: 'LA',
                  },
                  {
                    displayTextValue: 'Maine',
                    key: 'ME',
                  },
                  {
                    displayTextValue: 'Marshall Islands',
                    key: 'MH',
                  },
                  {
                    displayTextValue: 'Maryland',
                    key: 'MD',
                  },
                  {
                    displayTextValue: 'Massachusetts',
                    key: 'MA',
                  },
                  {
                    displayTextValue: 'Michigan',
                    key: 'MI',
                  },
                  {
                    displayTextValue: 'Minnesota',
                    key: 'MN',
                  },
                  {
                    displayTextValue: 'Mississippi',
                    key: 'MS',
                  },
                  {
                    displayTextValue: 'Missouri',
                    key: 'MO',
                  },
                  {
                    displayTextValue: 'Montana',
                    key: 'MT',
                  },
                  {
                    displayTextValue: 'Nebraska',
                    key: 'NE',
                  },
                  {
                    displayTextValue: 'Nevada',
                    key: 'NV',
                  },
                  {
                    displayTextValue: 'New Hampshire',
                    key: 'NH',
                  },
                  {
                    displayTextValue: 'New Jersey',
                    key: 'NJ',
                  },
                  {
                    displayTextValue: 'New Mexico',
                    key: 'NM',
                  },
                  {
                    displayTextValue: 'New York',
                    key: 'NY',
                  },
                  {
                    displayTextValue: 'North Carolina',
                    key: 'NC',
                  },
                  {
                    displayTextValue: 'North Dakota',
                    key: 'ND',
                  },
                  {
                    displayTextValue: 'Northern Mariana Islands',
                    key: 'MP',
                  },
                  {
                    displayTextValue: 'Ohio',
                    key: 'OH',
                  },
                  {
                    displayTextValue: 'Oklahoma',
                    key: 'OK',
                  },
                  {
                    displayTextValue: 'Oregon',
                    key: 'OR',
                  },
                  {
                    displayTextValue: 'Palau',
                    key: 'PW',
                  },
                  {
                    displayTextValue: 'Pennsylvania',
                    key: 'PA',
                  },
                  {
                    displayTextValue: 'Puerto Rico',
                    key: 'PR',
                  },
                  {
                    displayTextValue: 'Rhode Island',
                    key: 'RI',
                  },
                  {
                    displayTextValue: 'South Carolina',
                    key: 'SC',
                  },
                  {
                    displayTextValue: 'South Dakota',
                    key: 'SD',
                  },
                  {
                    displayTextValue: 'Tennessee',
                    key: 'TN',
                  },
                  {
                    displayTextValue: 'Texas',
                    key: 'TX',
                  },
                  {
                    displayTextValue: 'Utah',
                    key: 'UT',
                  },
                  {
                    displayTextValue: 'Vermont',
                    key: 'VT',
                  },
                  {
                    displayTextValue: 'Virgin Islands',
                    key: 'VI',
                  },
                  {
                    displayTextValue: 'Virginia',
                    key: 'VA',
                  },
                  {
                    displayTextValue: 'Washington',
                    key: 'WA',
                  },
                  {
                    displayTextValue: 'West Virginia',
                    key: 'WV',
                  },
                  {
                    displayTextValue: 'Wisconsin',
                    key: 'WI',
                  },
                  {
                    displayTextValue: 'Wyoming',
                    key: 'WY',
                  },
                ],
              },
              key: 'homeAddress.address.stateCode',
            },
            {
              input: true,
              props: {
                componentId: 'postalCode',
                label: 'Zip Code',
                required: true,
              },
              key: 'homeAddress.address.postalCode',
            },
            {
              input: true,
              props: {
                componentId: 'postalCodeExtension',
                label: 'Ext. (Optional)',
              },
              key: 'homeAddress.address.postalCodeExtension',
            },
            {
              input: true,
              props: {
                componentId: 'countryCode',
                label: 'Country',
                required: true,
                selectOptions: [
                  {
                    displayTextValue: 'United States',
                    key: 'US',
                  },
                  {
                    displayTextValue: 'Canada',
                    key: 'CA',
                  },
                  {
                    displayTextValue: 'Mexico',
                    key: 'MX',
                  },
                ],
              },
              key: 'homeAddress.address.countryCode',
            },
            {
              input: true,
              props: {
                componentId: 'gbpPlacesId',
                hidden: true,
                label: 'Place ID',
              },
              hide: true,
              key: 'homeAddress.placeId',
            },
          ],
          input: true,
          key: 'address1',
          type: 'nuverialAddress',
        },
        {
          key: 'gender',
          type: 'nuverialSelect',
          input: true,
          props: {
            label: 'Gender',
            colorTheme: 'primary',
            selectOptions: [
              {
                key: 'Male',
                displayTextValue: 'Male',
              },
              {
                key: 'Female',
                displayTextValue: 'Female',
              },
              {
                key: 'Transgender',
                displayTextValue: 'Transgender',
              },
              {
                key: 'Non-primary/non-conforming',
                displayTextValue: 'Non-primary/non-conforming',
              },
              {
                key: 'Prefer not to respond',
                displayTextValue: 'Prefer not to respond',
              },
            ],
          },
          className: 'flex-half',
        },
        {
          props: {
            label: 'Alternate Address',
          },
          className: 'flex-half',
          components: [
            {
              input: true,
              props: {
                componentId: 'addressLine1',
                label: 'Address Line 1',
                required: true,
              },
              key: 'alternateAddress.address.addressLine1',
            },
            {
              input: true,
              props: {
                componentId: 'addressLine2',
                label: 'Address Line 2 (optional)',
              },
              key: 'alternateAddress.address.addressLine2',
            },
            {
              input: true,
              props: {
                componentId: 'city',
                label: 'City',
                required: true,
              },
              key: 'alternateAddress.address.city',
            },
            {
              input: true,
              props: {
                componentId: 'stateCode',
                label: 'State',
                required: true,
                selectOptions: [
                  {
                    displayTextValue: 'Alabama',
                    key: 'AL',
                  },
                  {
                    displayTextValue: 'Alaska',
                    key: 'AK',
                  },
                  {
                    displayTextValue: 'American Samoa',
                    key: 'AS',
                  },
                  {
                    displayTextValue: 'Arizona',
                    key: 'AZ',
                  },
                  {
                    displayTextValue: 'Arkansas',
                    key: 'AR',
                  },
                  {
                    displayTextValue: 'California',
                    key: 'CA',
                  },
                  {
                    displayTextValue: 'Colorado',
                    key: 'CO',
                  },
                  {
                    displayTextValue: 'Connecticut',
                    key: 'CT',
                  },
                  {
                    displayTextValue: 'Delaware',
                    key: 'DE',
                  },
                  {
                    displayTextValue: 'District Of Columbia',
                    key: 'DC',
                  },
                  {
                    displayTextValue: 'Federated States Of Micronesia',
                    key: 'FM',
                  },
                  {
                    displayTextValue: 'Florida',
                    key: 'FL',
                  },
                  {
                    displayTextValue: 'Georgia',
                    key: 'GA',
                  },
                  {
                    displayTextValue: 'Guam',
                    key: 'GU',
                  },
                  {
                    displayTextValue: 'Hawaii',
                    key: 'HI',
                  },
                  {
                    displayTextValue: 'Idaho',
                    key: 'ID',
                  },
                  {
                    displayTextValue: 'Illinois',
                    key: 'IL',
                  },
                  {
                    displayTextValue: 'Indiana',
                    key: 'IN',
                  },
                  {
                    displayTextValue: 'Iowa',
                    key: 'IA',
                  },
                  {
                    displayTextValue: 'Kansas',
                    key: 'KS',
                  },
                  {
                    displayTextValue: 'Kentucky',
                    key: 'KY',
                  },
                  {
                    displayTextValue: 'Louisiana',
                    key: 'LA',
                  },
                  {
                    displayTextValue: 'Maine',
                    key: 'ME',
                  },
                  {
                    displayTextValue: 'Marshall Islands',
                    key: 'MH',
                  },
                  {
                    displayTextValue: 'Maryland',
                    key: 'MD',
                  },
                  {
                    displayTextValue: 'Massachusetts',
                    key: 'MA',
                  },
                  {
                    displayTextValue: 'Michigan',
                    key: 'MI',
                  },
                  {
                    displayTextValue: 'Minnesota',
                    key: 'MN',
                  },
                  {
                    displayTextValue: 'Mississippi',
                    key: 'MS',
                  },
                  {
                    displayTextValue: 'Missouri',
                    key: 'MO',
                  },
                  {
                    displayTextValue: 'Montana',
                    key: 'MT',
                  },
                  {
                    displayTextValue: 'Nebraska',
                    key: 'NE',
                  },
                  {
                    displayTextValue: 'Nevada',
                    key: 'NV',
                  },
                  {
                    displayTextValue: 'New Hampshire',
                    key: 'NH',
                  },
                  {
                    displayTextValue: 'New Jersey',
                    key: 'NJ',
                  },
                  {
                    displayTextValue: 'New Mexico',
                    key: 'NM',
                  },
                  {
                    displayTextValue: 'New York',
                    key: 'NY',
                  },
                  {
                    displayTextValue: 'North Carolina',
                    key: 'NC',
                  },
                  {
                    displayTextValue: 'North Dakota',
                    key: 'ND',
                  },
                  {
                    displayTextValue: 'Northern Mariana Islands',
                    key: 'MP',
                  },
                  {
                    displayTextValue: 'Ohio',
                    key: 'OH',
                  },
                  {
                    displayTextValue: 'Oklahoma',
                    key: 'OK',
                  },
                  {
                    displayTextValue: 'Oregon',
                    key: 'OR',
                  },
                  {
                    displayTextValue: 'Palau',
                    key: 'PW',
                  },
                  {
                    displayTextValue: 'Pennsylvania',
                    key: 'PA',
                  },
                  {
                    displayTextValue: 'Puerto Rico',
                    key: 'PR',
                  },
                  {
                    displayTextValue: 'Rhode Island',
                    key: 'RI',
                  },
                  {
                    displayTextValue: 'South Carolina',
                    key: 'SC',
                  },
                  {
                    displayTextValue: 'South Dakota',
                    key: 'SD',
                  },
                  {
                    displayTextValue: 'Tennessee',
                    key: 'TN',
                  },
                  {
                    displayTextValue: 'Texas',
                    key: 'TX',
                  },
                  {
                    displayTextValue: 'Utah',
                    key: 'UT',
                  },
                  {
                    displayTextValue: 'Vermont',
                    key: 'VT',
                  },
                  {
                    displayTextValue: 'Virgin Islands',
                    key: 'VI',
                  },
                  {
                    displayTextValue: 'Virginia',
                    key: 'VA',
                  },
                  {
                    displayTextValue: 'Washington',
                    key: 'WA',
                  },
                  {
                    displayTextValue: 'West Virginia',
                    key: 'WV',
                  },
                  {
                    displayTextValue: 'Wisconsin',
                    key: 'WI',
                  },
                  {
                    displayTextValue: 'Wyoming',
                    key: 'WY',
                  },
                ],
              },
              key: 'alternateAddress.address.stateCode',
            },
            {
              input: true,
              props: {
                componentId: 'postalCode',
                label: 'Zip Code',
                required: true,
              },
              key: 'alternateAddress.address.postalCode',
            },
            {
              input: true,
              props: {
                componentId: 'postalCodeExtension',
                label: 'Ext. (Optional)',
              },
              key: 'alternateAddress.address.postalCodeExtension',
            },
            {
              input: true,
              props: {
                componentId: 'countryCode',
                label: 'Country',
                required: true,
                selectOptions: [
                  {
                    displayTextValue: 'United States',
                    key: 'US',
                  },
                  {
                    displayTextValue: 'Canada',
                    key: 'CA',
                  },
                  {
                    displayTextValue: 'Mexico',
                    key: 'MX',
                  },
                ],
              },
              key: 'alternateAddress.address.countryCode',
            },
            {
              input: true,
              props: {
                componentId: 'gbpPlacesId',
                hidden: true,
                label: 'Place ID',
              },
              hide: true,
              key: 'alternateAddress.placeId',
            },
          ],
          input: true,
          key: 'address2',
          type: 'nuverialAddress',
        },
        {
          key: 'phone',
          type: 'nuverialTextInput',
          input: true,
          props: {
            mask: '(000) 000-0000',
            type: 'text',
            label: 'Phone',
          },
          className: 'flex-half',
        },
        {
          key: 'email',
          type: 'nuverialTextInput',
          input: true,
          props: {
            type: 'email',
            label: 'Email',
            required: true,
          },
          className: 'flex-half',
          validators: {
            validation: ['email'],
          },
        },
        {
          props: {
            label: 'Language',
            colorTheme: 'primary',
            selectOptions: [
              {
                key: 'English',
                displayTextValue: 'English',
              },
              {
                displayTextValue: 'Spanish',
                key: 'Spanish',
              },
            ],
          },
          className: 'flex-half',
          key: 'language',
          type: 'nuverialSelect',
          input: true,
        },
        {
          props: {
            label: 'Communication Preference',
            colorTheme: 'primary',
            selectOptions: [
              {
                key: 'Phone Call',
                displayTextValue: 'Phone Call',
              },
              {
                displayTextValue: 'SMS',
                key: 'SMS',
              },
            ],
          },
          className: 'flex-half',
          key: 'communicationPreferences',
          type: 'nuverialSelect',
          input: true,
        },
      ],
      input: true,
      key: 'personalInformation',
      props: {
        label: 'Personal Information',
      },
      title: 'Personal Information',
      type: 'panel',
    },
    {
      title: 'Demographics',
      type: 'panel',
      key: 'accommodations',
      components: [
        {
          key: 'accommodations.disabilities',
          type: 'nuverialSelect',
          input: true,
          props: {
            label: 'Disabilities',
            colorTheme: 'primary',
            selectOptions: [
              {
                key: 'Epilepsy',
                displayTextValue: 'Epilepsy',
              },
              {
                key: 'Orthopedic',
                displayTextValue: 'Orthopedic',
              },
              {
                key: 'Vision',
                displayTextValue: 'Vision',
              },
            ],
          },
          className: 'flex-half',
        },
        {
          props: {
            label: 'Personal Care Attendant',
            colorTheme: 'primary',
            fieldLabelPosition: 'after',
          },
          className: 'flex-half',
          key: 'accommodations.pcaRequired',
          input: true,
          type: 'nuverialCheckbox',
        },
        {
          key: 'accommodations.mobilityDevices',
          type: 'nuverialSelect',
          input: true,
          props: {
            label: 'Mobility Devices',
            colorTheme: 'primary',
            selectOptions: [
              {
                key: 'Walker',
                displayTextValue: 'Walker',
              },
              {
                key: 'Support Cane',
                displayTextValue: 'Support Cane',
              },
              {
                key: 'Power Wheelchair',
                displayTextValue: 'Power Wheelchair',
              },
            ],
          },
          className: 'flex-half',
        },
        {
          props: {
            label: 'Interpreter Needed',
            colorTheme: 'primary',
            fieldLabelPosition: 'after',
          },
          className: 'flex-half',
          key: 'accommodations.interpreterNeeded',
          input: true,
          type: 'nuverialCheckbox',
        },
        {
          props: {
            label: 'Fare Type',
            colorTheme: 'primary',
            selectOptions: [
              {
                displayTextValue: 'Regular',
                key: 'Regular',
              },
            ],
          },
          className: 'flex-half',
          key: 'accommodations.fareType',
          input: true,
          type: 'nuverialSelect',
        },
        {
          props: {
            label: 'Travel Training',
            colorTheme: 'primary',
            fieldLabelPosition: 'after',
          },
          className: 'flex-half',
          key: 'accommodations.travelTraining',
          input: true,
          type: 'nuverialCheckbox',
        },
        {
          props: {
            label: 'Service Animal',
            colorTheme: 'primary',
            fieldLabelPosition: 'after',
          },
          className: 'flex-half',
          key: 'accommodations.serviceAnimalRequired',
          input: true,
          type: 'nuverialCheckbox',
        },
      ],
      input: true,
      props: {
        label: 'Demographics',
      },
    },
    {
      title: 'Ride Information',
      type: 'panel',
      key: 'rideTypes',
      components: [
        {
          key: 'rideTypes',
          type: 'nuverialSelect',
          input: true,
          props: {
            label: 'Ride Type',
            colorTheme: 'primary',
            selectOptions: [
              {
                key: 'Turnaround',
                displayTextValue: 'Turnaround',
              },
              {
                key: 'Subscription',
                displayTextValue: 'Subscription',
              },
            ],
          },
          className: 'flex-half',
        },
        {
          key: 'paymentTypes',
          type: 'nuverialSelect',
          input: true,
          props: {
            label: 'Payment',
            colorTheme: 'primary',
            selectOptions: [],
          },
          className: 'flex-half',
        },
      ],
      input: true,
      props: {
        label: 'Ride Information',
      },
    },
    {
      title: 'Contacts',
      type: 'panel',
      key: 'emergencyContact',
      components: [
        {
          props: {
            label: 'Emergency Contact Name',
            type: 'text',
          },
          className: 'flex-half',
          key: 'emergencyContact.fullName',
          input: true,
          type: 'nuverialTextInput',
        },
        {
          props: {
            label: 'Personal Care Attendant Name',
            type: 'text',
          },
          className: 'flex-half',
          key: 'accommodations.personalCareAttendant.fullName',
          input: true,
          type: 'nuverialTextInput',
        },
        {
          props: {
            label: 'Relationship',
            type: 'text',
          },
          className: 'flex-half',
          key: 'emergencyContact.relationship',
          input: true,
          type: 'nuverialTextInput',
        },
        {
          props: {
            label: 'Personal Care Attendant Phone',
            type: 'text',
            mask: '(000) 000-0000',
          },
          className: 'flex-half',
          key: 'accommodations.personalCareAttendant.phone',
          input: true,
          type: 'nuverialTextInput',
        },
        {
          props: {
            label: 'Emergency Contact Phone',
            type: 'text',
            mask: '(000) 000-0000',
          },
          className: 'flex-half',
          key: 'emergencyContact.phone',
          input: true,
          type: 'nuverialTextInput',
        },
      ],
      input: true,
      props: {
        label: 'Contacts',
      },
    },
  ],
  true,
);
