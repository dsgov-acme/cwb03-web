import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IFormConfigurationSchema } from '@dsg/shared/data-access/work-api';
import { NuverialTextInputComponent } from '@dsg/shared/ui/nuverial';
import { ENVIRONMENT_CONFIGURATION, IEnvironment } from '@dsg/shared/utils/environment';
import { AddressFieldToKeys, GoogleAddress, GoogleAddressAttributes, GooglePlace } from '../models/googleplaces.api.model';
import { AddressField } from './../models/googleplaces.api.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, NuverialTextInputComponent],
  selector: 'dsg-google-maps-autocomplete',
  standalone: true,
  styleUrls: ['./google-maps-autocomplete.component.scss'],
  templateUrl: './google-maps-autocomplete.component.html',
})
export class GoogleMapsAutocompleteComponent implements OnInit {
  @Output() public readonly gotGoogleAddress = new EventEmitter<GooglePlace>();
  @Output() public readonly gotGoogleAddressTemplate = new EventEmitter<GooglePlace>();
  @Input() public component?: IFormConfigurationSchema;
  @Input() public label: string | undefined;
  @Input() public required: boolean | undefined;
  @Input() public formControl!: FormControl;

  public inputElement: ElementRef | undefined;

  public mapsAutocomplete: google.maps.places.Autocomplete | undefined;
  public autocompleteOptions = {
    componentRestrictions: { country: 'us' },
    strictBounds: true,
    types: ['address'],
  };

  constructor(@Inject(ENVIRONMENT_CONFIGURATION) private readonly _environment: IEnvironment, private readonly _renderer: Renderer2) {}

  public async ngOnInit(): Promise<void> {
    await this._loadScript();

    this.mapsAutocomplete = new google.maps.places.Autocomplete(this.inputElement?.nativeElement, this.autocompleteOptions);
    this.mapsAutocomplete.addListener('place_changed', () => {
      const place = this.mapsAutocomplete?.getPlace();
      if (place) {
        const googleAddress: GoogleAddress = this.getGoogleAddress(place);
        const googlePlace: GooglePlace = new GooglePlace(googleAddress);
        this.gotGoogleAddress.emit(googlePlace);
        if (this.inputElement) this.inputElement.nativeElement.value = googlePlace.addressLine1;
      }
    });
  }

  public getInputElement(inputElement: ElementRef) {
    this.inputElement = inputElement;
  }

  public getCoordinates(location: google.maps.LatLng): [string, string] {
    const coordinates = JSON.parse(JSON.stringify(location));
    const lat = coordinates.lat;
    const long = coordinates.lng;

    return [lat, long];
  }

  public getGoogleAddress(place: google.maps.places.PlaceResult): GoogleAddress {
    const googleAddress: GoogleAddress = {
      formattedAddress: place.formatted_address,
      gbpPlacesId: place.place_id,
      ...(place.geometry?.location ? { ...this.getCoordinates(place.geometry.location) } : {}),
    };

    if (place.address_components) {
      place.address_components.forEach(component => {
        const type = component.types.find(_type => GoogleAddressAttributes.has(_type)) as AddressField;
        const addressKey: AddressFieldToKeys = AddressFieldToKeys[type];

        if (type && addressKey) {
          switch (type) {
            case AddressField.streetNumber:
            case AddressField.streetName:
            case AddressField.suite:
            case AddressField.neighborhood:
            case AddressField.city:
            case AddressField.county:
            case AddressField.state:
              googleAddress[addressKey] = component.short_name;
              if (type === AddressField.state) {
                googleAddress.stateLong = component.long_name;
              }
              break;
            case AddressField.zipcode:
            case AddressField.zipcodeSecondary:
            case AddressField.country:
              googleAddress[addressKey] = component.short_name;
              break;
          }
        }
      });
    }

    return googleAddress;
  }

  private _loadScript(): Promise<void> {
    // Check if the Google Maps script has already been loaded
    if (typeof google === 'object' && typeof google.maps === 'object') {
      return Promise.resolve();
    }

    // Define the script URL
    const url = `https://maps.googleapis.com/maps/api/js?key=${this._environment.googlePlacesApiConfiguration?.googleApiKey}&libraries=places`;

    // Check if the script element already exists
    const existingScript = document.querySelector(`script[src="${url}"]`);

    if (existingScript) {
      // If the script element exists, check if it's still loading
      if (existingScript.hasAttribute('data-loading')) {
        // If it's still loading, wait for it to finish loading
        return new Promise<void>(resolve => {
          existingScript.addEventListener('load', () => {
            resolve();
          });
        });
      } else {
        // If it's already loaded, resolve immediately
        return Promise.resolve();
      }
    }

    // Create script element
    const script = this._renderer.createElement('script');
    script.async = true;
    script.src = url;

    // Set a data attribute to indicate that the script is still loading
    script.setAttribute('data-loading', 'true');

    // Create a promise that resolves when the script is loaded
    const scriptLoaded = new Promise<void>((resolve, reject) => {
      script.onload = () => {
        script.removeAttribute('data-loading');
        resolve();
      };
      script.onerror = () => {
        script.removeAttribute('data-loading');
        reject();
      };
    });

    // Append script to the document header
    this._renderer.appendChild(document.head, script);

    // Return the promise that resolves when the script is loaded
    return scriptLoaded;
  }
}
