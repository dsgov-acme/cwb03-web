/* eslint-disable @typescript-eslint/naming-convention */
import { ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EnvironmentTestingModule } from '@dsg/shared/utils/environment';
import { initialize } from '@googlemaps/jest-mocks';
import { GoogleMapsAutocompleteComponent } from './google-maps-autocomplete.component';

describe('GoogleMapsAutocompleteComponent', () => {
  let component: GoogleMapsAutocompleteComponent;
  let fixture: ComponentFixture<GoogleMapsAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleMapsAutocompleteComponent, EnvironmentTestingModule, NoopAnimationsModule],
      providers: [
        { provide: ElementRef, useValue: { nativeElement: {} } },
        { provide: Renderer2, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleMapsAutocompleteComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Init', () => {
    it('should call _loadScript during ngOnInit', async () => {
      // Arrange
      jest.spyOn(component as any, '_loadScript');

      // Act
      initialize();
      await component.ngOnInit();

      // Assert
      expect((component as any)._loadScript).toHaveBeenCalled();
    });
  });

  it('should set inputElement property', () => {
    const inputElement = { nativeElement: {} };
    component.getInputElement(inputElement);
    expect(component.inputElement).toBe(inputElement);
  });

  describe('getCoordinates', () => {
    it('should return coordinates as an array', () => {
      // Arrange
      const mockLocation = {
        lat: '40.7128',
        lng: '-74.0060',
      } as unknown as google.maps.LatLng;

      // Act
      const result = component.getCoordinates(mockLocation);

      // Assert
      expect(result).toEqual(['40.7128', '-74.0060']);
    });
  });

  describe('getGoogleAddress', () => {
    it('should return GoogleAddress object with valid input', () => {
      // Arrange
      const mockPlaceResult = {
        formatted_address: '123 Main St, Cityville, USA',
        place_id: 'abc123',
        geometry: {
          location: {
            lat: 40.7128,
            lng: -74.006,
          },
        },
        address_components: [
          {
            short_name: '123',
            types: ['street_number'],
          },
          {
            short_name: 'Main St',
            types: ['route'],
          },
          {
            short_name: 'Suite 1',
            types: ['subpremise'],
          },
          {
            short_name: 'neighborhood',
            types: ['neighborhood'],
          },
          {
            short_name: 'Troy',
            types: ['locality'],
          },
          {
            short_name: 'Rensselaer County',
            types: ['administrative_area_level_2'],
          },
          {
            short_name: 'NY',
            types: ['administrative_area_level_1'],
          },
          {
            short_name: '55555',
            types: ['postal_code'],
          },
          {
            short_name: '123',
            types: ['postal_code_suffix'],
          },
          {
            short_name: 'USA',
            types: ['country'],
          },
        ],
      } as unknown as google.maps.places.PlaceResult;

      // Act
      const result = component.getGoogleAddress(mockPlaceResult);

      // Assert
      expect(result).toEqual({
        ['0']: 40.7128,
        ['1']: -74.006,
        country: 'USA',
        suite: 'Suite 1',
        neighborhood: 'neighborhood',
        city: 'Troy',
        county: 'Rensselaer County',
        zip: '55555',
        zipSecondary: '123',
        formattedAddress: '123 Main St, Cityville, USA',
        gbpPlacesId: 'abc123',
        state: 'NY',
        streetNumber: '123',
        streetName: 'Main St',
      });
    });
  });

  describe('_loadScript', () => {
    it('should return a resolved promise if Google Maps script is already loaded', async () => {
      // Act
      initialize();
      const result = await component['_loadScript']();

      // Assert
      expect(result).toBeUndefined();
    });

    // skip for now until we can successfully mock script onLoad event
    it.skip('should return a resolved promise if the script element already exists and is loaded', async () => {
      // Arrange
      initialize();
      (google.maps as any) = undefined;
      const url = `https://maps.googleapis.com/maps/api/js?key=${component['_environment'].googlePlacesApiConfiguration?.googleApiKey}&libraries=places`;
      const existingScript = document.createElement('script');
      existingScript.src = url;
      document.head.appendChild(existingScript);

      existingScript.dispatchEvent(new Event('load'));

      // Act
      const result = await component['_loadScript']();

      // Assert
      expect(result).toBeUndefined();
    });

    it.skip('should return a promise that resolves when the script is loaded', async () => {
      // Arrange

      // Act
      const result = await component['_loadScript']();

      // Assert
      expect(result).toBeUndefined();
    });
  });
});
