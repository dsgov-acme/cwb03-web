/* eslint-disable sort-keys */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { LocationType, MTALocation } from '../components/advanced/select-saved-location/models/formly-select-saved-location.model';

@Injectable({
  providedIn: 'root',
})
export class SavedLocationService {
  private readonly _savedLocationsSubject: BehaviorSubject<MTALocation[]> = new BehaviorSubject<MTALocation[]>([]);

  // constructor(private readonly _workApiRoutesService: WorkApiRoutesService) {}

  public getSavedLocationById(locationId: string): MTALocation | undefined {
    return this._savedLocationsSubject.value.find(loc => loc.id === locationId);
  }

  public getSavedLocations$(userId: string): Observable<MTALocation[]> {
    // TODO: retrieve saved locations for current user from backend API
    // this._workApiRoutesService.getSavedLocationsByUserId$(userId).pipe(tap(loc => this._savedLocationsSubject.next(loc)));
    // TODO: remove if-else block when implemented
    const locations: Observable<MTALocation[]> = of([
      {
        id: 'abc123',
        name: 'Halifax House',
        latitude: 1.33,
        longitude: 4.33,
        locationType: LocationType.SavedLocation,
        address: {
          address1: '123 Main St',
          city: 'Halifax',
          stateCode: 'CA',
          postalCode: '12345',
          countryCode: 'US',
        },
      },
    ]).pipe(tap(loc => this._savedLocationsSubject.next(loc)));
    if (userId) {
      return locations;
    } else {
      return locations;
    }
  }
}
