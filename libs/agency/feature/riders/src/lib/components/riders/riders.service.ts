import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DashboardCountModel, RecordListModel, WorkApiRoutesService } from '@dsg/shared/data-access/work-api';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';

const RECORD_DEFINITION_KEY = 'recordDefinitionKey';

@Injectable({
  providedIn: 'root',
})
export class RidersService {
  private readonly _recordLists: BehaviorSubject<RecordListModel[]> = new BehaviorSubject<RecordListModel[]>([]);

  constructor(
    private readonly _workApiRoutesService: WorkApiRoutesService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
  ) {}

  public getRecordLists$(): Observable<RecordListModel[]> {
    if (this._recordLists.value.length) {
      return of(this._recordLists.value);
    }

    return this._workApiRoutesService.getRecordLists$().pipe(
      tap(recordLists => {
        this._recordLists.next(recordLists);
      }),
    );
  }

  public loadRecordLists$() {
    return combineLatest([
      this.getRecordLists$(),
      this._activatedRoute.queryParamMap.pipe(
        map(params => {
          let recordDefinitionKey = params.get(RECORD_DEFINITION_KEY) ?? '';
          if (!recordDefinitionKey) {
            recordDefinitionKey = localStorage.getItem(RECORD_DEFINITION_KEY) ?? '';
            this._router.navigate([], {
              queryParams: { recordDefinitionKey } as Params,
              queryParamsHandling: 'merge',
              relativeTo: this._activatedRoute,
            });
          }

          return recordDefinitionKey;
        }),
        distinctUntilChanged(),
      ),
    ]).pipe(
      switchMap(([recordLists, recordDefinitionKey]) => {
        if (!recordLists.length) return of(undefined);

        const selectedRecordList = recordLists.find(recordList => recordList.recordDefinitionKey === recordDefinitionKey);
        if (!recordDefinitionKey || !selectedRecordList) {
          if (localStorage.getItem(RECORD_DEFINITION_KEY)) {
            this._router.navigate([], {
              queryParams: {
                recordDefinitionKey: localStorage.getItem(RECORD_DEFINITION_KEY),
              } as Params,
              queryParamsHandling: 'merge',
              relativeTo: this._activatedRoute,
            });

            return of(recordLists.find(recordList => recordList.recordDefinitionKey === localStorage.getItem(RECORD_DEFINITION_KEY)));
          } else {
            this._router.navigate([], {
              queryParams: {
                recordDefinitionKey: recordLists[0].recordDefinitionKey,
              } as Params,
              queryParamsHandling: 'merge',
              relativeTo: this._activatedRoute,
            });

            return of(recordLists[0]);
          }
        }

        localStorage.setItem(RECORD_DEFINITION_KEY, recordDefinitionKey);

        return of(selectedRecordList);
      }),
    );
  }

  public getRecordListTabCount$(key: string): Observable<DashboardCountModel[]> {
    return this._workApiRoutesService.getRecordListCounts$(key);
  }

  public cleanUp() {
    this._recordLists.next([]);
  }
}
