import { Injectable } from '@angular/core';
import { MTALocation, RecordData, RecordModel, WorkApiRoutesService } from '@dsg/shared/data-access/work-api';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RiderProfileService {
  private readonly _recordId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly _riderId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly _rider: BehaviorSubject<RecordModel> = new BehaviorSubject<RecordModel>(new RecordModel());
  private readonly _savedLocations: BehaviorSubject<MTALocation[]> = new BehaviorSubject<MTALocation[]>([]);
  private readonly _recordData: BehaviorSubject<RecordData> = new BehaviorSubject({});

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public rider$: Observable<RecordModel> = this._rider.asObservable();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public savedLocations$: Observable<MTALocation[]> = this._savedLocations.asObservable();

  constructor(private readonly _workApiRoutesService: WorkApiRoutesService) {}

  public get recordId(): string {
    return this._recordId.value;
  }

  public get riderId(): string {
    return this._riderId.value;
  }

  public get rider() {
    return this._rider.value;
  }

  public set rider(value: RecordModel) {
    this._rider.next(value);
  }

  public get savedLocations() {
    return this._savedLocations.value;
  }

  public set savedLocations(value: MTALocation[]) {
    this._savedLocations.next(value);
  }

  public loadRiderDetails$(riderId: string): Observable<RecordModel> {
    this._recordId.next(riderId);

    return this._getRider$().pipe(
      tap(rider => {
        this._recordData.next(rider.data);
        this.rider = rider;
        this._riderId.next(rider.externalId);
      }),
      switchMap(res => {
        this._riderId.next(res.externalId);

        return this._getSavedLocations$().pipe(
          tap(locations => {
            this.savedLocations = locations;
          }),
          switchMap(() => {
            return of(res);
          }),
        );
      }),
    );
  }

  /**
   * clean up and reset state
   */
  public cleanUp() {
    this._recordId.next('');
    this._riderId.next('');
    this._savedLocations.next([]);
    this._rider.next(new RecordModel());
  }

  private _getSavedLocations$(): Observable<MTALocation[]> {
    return this._workApiRoutesService.getSavedLocationsByRiderId$(this._riderId.value);
  }

  private _getRider$(): Observable<RecordModel> {
    return this._workApiRoutesService.getRecordById$(this._recordId.value).pipe(tap(recordModel => this._rider.next(recordModel)));
  }
}
