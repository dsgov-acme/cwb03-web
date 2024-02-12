/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { PromiseTime } from '../components/advanced/select-promise-time/models/formly-select-promise-time.model';

@Injectable({
  providedIn: 'root',
})
export class PromiseTimeService {
  private readonly _promiseTimeSubject: BehaviorSubject<PromiseTime[]> = new BehaviorSubject<PromiseTime[]>([]);

  // constructor(private readonly _workApiRoutesService: WorkApiRoutesService) {}

  public getPromiseTimeById(promiseTimeId: string): PromiseTime | undefined {
    return this._promiseTimeSubject.value.find(time => time.id === promiseTimeId);
  }

  public getPromiseTimesForNewReservation$(transactionId: string): Observable<PromiseTime[]> {
    // TODO: retrieve promise times for the current transaction - necessary details should be available after saving previous step
    // this._workApiRoutesService.getPromiseTimesByTransactionId$(transactionId).pipe(tap(loc => this._promiseTimeSubject.next(loc)));
    return of([
      {
        id: 'promiseTime1',
        time: '14:15',
        anchor: 'Leave At',
      },
      {
        id: 'promiseTime2',
        time: '14:35',
        anchor: 'Leave At',
      },
      {
        id: 'promiseTime3',
        time: '14:50',
        anchor: 'Arrive By',
      },
      {
        id: 'promiseTime4',
        time: '15:00',
        anchor: 'Arrive By',
      },
    ]).pipe(tap(loc => this._promiseTimeSubject.next(loc)));
  }
}
