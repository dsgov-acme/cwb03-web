/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-keys */
import { Injectable } from '@angular/core';
import { PromiseTime, PromiseTimeRequest, PromiseTimeResponse, WorkApiRoutesService } from '@dsg/shared/data-access/work-api';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromiseTimeService {
  private readonly _promiseTimeSubject: BehaviorSubject<PromiseTime[]> = new BehaviorSubject<PromiseTime[]>([]);

  constructor(private readonly _workApiRoutesService: WorkApiRoutesService) {}

  public getPromiseTimeById(promiseTimeId: string): PromiseTime | undefined {
    return this._promiseTimeSubject.value.find(time => time.id === promiseTimeId);
  }

  public getPromiseTimesForNewReservation$(promiseTimeRequest: PromiseTimeRequest): Observable<PromiseTimeResponse> {
    return this._workApiRoutesService.getPromiseTimes$(promiseTimeRequest).pipe(tap(response => this._promiseTimeSubject.next(response.promises || [])));
  }
}
