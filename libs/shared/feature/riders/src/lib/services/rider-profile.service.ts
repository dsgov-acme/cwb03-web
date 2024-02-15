import { Injectable } from '@angular/core';
import { RecordData, RecordModel, WorkApiRoutesService } from '@dsg/shared/data-access/work-api';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RiderProfileService {
  private readonly _riderId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly _rider: BehaviorSubject<RecordModel> = new BehaviorSubject<RecordModel>(new RecordModel());
  private readonly _recordData: BehaviorSubject<RecordData> = new BehaviorSubject({});

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public rider$: Observable<RecordModel> = this._rider.asObservable();

  constructor(private readonly _workApiRoutesService: WorkApiRoutesService) {}

  public get riderId(): string {
    return this._riderId.value;
  }

  public get rider() {
    return this._rider.value;
  }

  public set rider(value: RecordModel) {
    this._rider.next(value);
  }

  public loadRiderDetails$(riderId: string): Observable<RecordModel> {
    this._riderId.next(riderId);

    return this._getRider$().pipe(
      tap(rider => {
        this._recordData.next(rider.data);
        this.rider = rider;
      }),
    );
  }

  /**
   * clean up and reset state
   */
  public cleanUp() {
    this._riderId.next('');
    this._rider.next(new RecordModel());
  }

  private _getRider$(): Observable<RecordModel> {
    return this._workApiRoutesService.getRecordById$(this._riderId.value).pipe(tap(recordModel => this._rider.next(recordModel)));
  }
}
