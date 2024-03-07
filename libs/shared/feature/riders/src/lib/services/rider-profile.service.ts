/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { MTALocation, RecordModel, TransactionModel, WorkApiRoutesService } from '@dsg/shared/data-access/work-api';
import { Filter, PagingRequestModel } from '@dsg/shared/utils/http';
import { BehaviorSubject, Observable, forkJoin, map, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RiderProfileService {
  private readonly _recordId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly _riderId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly _riderUserId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private readonly _rider: BehaviorSubject<RecordModel> = new BehaviorSubject<RecordModel>(new RecordModel());
  private readonly _savedLocations: BehaviorSubject<MTALocation[]> = new BehaviorSubject<MTALocation[]>([]);
  private readonly _reservations: BehaviorSubject<TransactionModel[]> = new BehaviorSubject<TransactionModel[]>([]);

  public rider$: Observable<RecordModel> = this._rider.asObservable();
  public savedLocations$: Observable<MTALocation[]> = this._savedLocations.asObservable();
  public reservations$: Observable<TransactionModel[]> = this._reservations.asObservable();

  constructor(private readonly _workApiRoutesService: WorkApiRoutesService) {}

  public get recordId(): string {
    return this._recordId.value;
  }

  public get riderId(): string {
    return this._riderId.value;
  }

  public get riderUserId(): string {
    return this._riderUserId.value;
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

  public get reservations() {
    return this._reservations.value;
  }

  public set reservations(value: TransactionModel[]) {
    this._reservations.next(value);
  }

  public loadRiderDetails$(riderId: string): Observable<RecordModel> {
    this._recordId.next(riderId);

    return this._getRider$().pipe(
      tap(rider => {
        this.rider = rider;
        this._riderId.next(rider.externalId);
        this._riderUserId.next(rider.subjectUserId);
      }),
      switchMap(rider => {
        return forkJoin([this._getReservations$(), this._getSavedLocations$()]).pipe(map(() => rider));
      }),
    );
  }

  /**
   * clean up and reset state
   */
  public cleanUp() {
    this._recordId.next('');
    this._riderId.next('');
    this._riderUserId.next('');
    this._rider.next(new RecordModel());
    this._savedLocations.next([]);
    this._reservations.next([]);
  }

  private _getReservations$(): Observable<TransactionModel[]> {
    const filters: Filter[] = [];
    filters.push({ field: 'subjectUserId', value: this.riderUserId });
    filters.push({ field: 'status', value: 'CONFIRMED' });
    filters.push({ field: 'status', value: 'Draft' });
    filters.push({ field: 'status', value: 'Cancelled' });
    const pagination: PagingRequestModel = new PagingRequestModel({ pageSize: 100 });

    return this._workApiRoutesService.getTransactionsList$('MTAReservation', filters, pagination).pipe(
      map(page => {
        return page.items.sort((r1, r2) => {
          const promiseTime1 = <{ pickupTime?: number; dropTime?: number }>r1.data['promiseTime'];
          const promiseTime2 = <{ pickupTime?: number; dropTime?: number }>r2.data['promiseTime'];

          if (promiseTime1?.pickupTime && promiseTime2.pickupTime) {
            if (promiseTime1.pickupTime < promiseTime2.pickupTime) {
              return -1;
            }

            if (promiseTime1.pickupTime > promiseTime2.pickupTime) {
              return 1;
            }

            return 0;
          }

          return 0;
        });
      }),
      tap(reservations => {
        this._reservations.next(reservations);
      }),
    );
  }

  private _getSavedLocations$(): Observable<MTALocation[]> {
    return this._workApiRoutesService.getSavedLocationsByRiderId$(this._riderId.value).pipe(tap(locations => this._savedLocations.next(locations)));
  }

  private _getRider$(): Observable<RecordModel> {
    return this._workApiRoutesService.getRecordById$(this._recordId.value).pipe(tap(recordModel => this._rider.next(recordModel)));
  }
}
