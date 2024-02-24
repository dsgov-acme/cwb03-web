/* eslint-disable sort-keys */
import { Injectable } from '@angular/core';
import { WorkApiRoutesService } from '@dsg/shared/data-access/work-api';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MTALocation } from '../components/advanced/select-saved-location/models/formly-select-saved-location.model';

@Injectable({
  providedIn: 'root',
})
export class SavedLocationService {
  private readonly _savedLocationsSubject: BehaviorSubject<MTALocation[]> = new BehaviorSubject<MTALocation[]>([]);

  constructor(private readonly _workApiRoutesService: WorkApiRoutesService) {}

  public getSavedLocationById(locationId: string): MTALocation | undefined {
    return this._savedLocationsSubject.value.find(loc => loc.id === locationId);
  }

  public getSavedLocations$(userId: string): Observable<MTALocation[]> {
    return this._workApiRoutesService.getSavedLocationsByUserId$(userId).pipe(tap(loc => this._savedLocationsSubject.next(loc)));
  }
}
