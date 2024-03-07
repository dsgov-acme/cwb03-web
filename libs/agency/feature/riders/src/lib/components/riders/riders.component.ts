import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DashboardCountModel, IRecord, PriorityVisuals, RecordListCountModel, WorkApiRoutesService } from '@dsg/shared/data-access/work-api';
import { UserStateService } from '@dsg/shared/feature/app-state';
import {
  IColumnType,
  IDisplayedColumn,
  INuverialTab,
  NuverialIconComponent,
  NuverialSnackBarService,
  NuverialSpinnerComponent,
  NuverialTableComponent,
  NuverialTextInputComponent,
  SplitCamelCasePipe,
} from '@dsg/shared/ui/nuverial';
import { IPagingMetadata, PagingRequestModel, SortOrder, pageSizeOptions } from '@dsg/shared/utils/http';
import { omit } from 'lodash';
import { Observable, catchError, firstValueFrom, map, of, switchMap, take, tap } from 'rxjs';
import { RidersService } from './riders.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    SplitCamelCasePipe,
    MatPaginatorModule,
    MatProgressBarModule,
    NuverialSpinnerComponent,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NuverialIconComponent,
    NuverialTextInputComponent,
    FormsModule,
    NuverialTableComponent,
  ],
  providers: [DatePipe],
  selector: 'dsg-agency-riders',
  standalone: true,
  styleUrls: ['./riders.component.scss'],
  templateUrl: './riders.component.html',
})
export class RidersComponent implements OnDestroy {
  @ViewChild(MatSort) public tableSort!: MatSort;

  public displayedColumns: IDisplayedColumn[] = [];
  public priorityVisuals = PriorityVisuals;
  public tabs: INuverialTab[] = [];
  public activeTabIndex = 0;
  public riders: IRecord[] = [];
  public riderListIsLoading = false;
  public dataSourceTable = new MatTableDataSource<unknown>();
  public pageSizeOptions = pageSizeOptions;
  public pagingMetadata: IPagingMetadata | undefined;
  public sortDirection: SortDirection = 'asc';
  public searchInput = new FormControl();
  public searchBoxIcon = 'search';
  public recordListCounts: RecordListCountModel[] = [];
  public recordDefinitionKey = '';
  public recordListLabel = '';
  public readonly pagingRequestModel: PagingRequestModel = new PagingRequestModel({}, this._router, this._activatedRoute);

  public riderListDetails$ = this._ridersService.loadRecordLists$().pipe(
    switchMap(recordList => {
      if (!recordList) {
        this.recordDefinitionKey = '';
        this.recordListLabel = '';

        return of({ columns: [], tabs: [] });
      }
      this.recordDefinitionKey = recordList.recordDefinitionKey;
      this.recordListLabel = recordList.recordListLabel;
      this.pagingRequestModel.reset({ pageSize: this.pagingRequestModel.pageSize });

      return this.updateTabCounts(this.recordDefinitionKey).pipe(
        map(counts => {
          this.recordListCounts = counts;

          const tabs = recordList.tabs.map(tab => ({
            count: this.getCountByTabLabel(tab.tabLabel),
            filters: new Map(Object.entries(tab.filter || {})),
            key: Object.keys(tab.filter || {}).join(', '),
            label: tab.tabLabel,
            value: Object.values(tab.filter || {}).join(', '),
          }));

          return { columns: recordList.columns, tabs };
        }),
      );
    }),
    tap(({ columns, tabs }) => {
      this.tabs = tabs;
      this.displayedColumns = columns.map(col => ({
        attributePath: col.attributePath,
        label: col.columnLabel,
        sortable: col.sortable,
        type: (col.displayFormat?.toLowerCase() as IColumnType) || 'default',
      }));

      this._tabsCopy = JSON.stringify(
        this.tabs.map(tab => {
          const tabCopy = omit(tab, 'template'); // Omit the 'template' property
          const mapToObject = (mapSource: Map<string, string>): Record<string, string> =>
            Array.from(mapSource).reduce<Record<string, string>>((obj, [key, value]) => {
              obj[key] = value;

              return obj;
            }, {});
          if (tabCopy.filters instanceof Map) {
            return { ...tabCopy, filters: mapToObject(tabCopy.filters) };
          }

          return tabCopy;
        }),
      );

      this._setActiveTab();
      this.clearSearch();
    }),
    catchError(error => {
      this._nuverialSnackBarService.notifyApplicationError(error);

      return of({ columns: [], tabs: [] });
    }),
  );

  private _tabsCopy = '';

  constructor(
    private readonly _workApiRoutesService: WorkApiRoutesService,
    private readonly _userStateService: UserStateService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _nuverialSnackBarService: NuverialSnackBarService,
    private readonly _ridersService: RidersService,
  ) {}

  public getRidersList() {
    const searchText = this.searchInput.value?.trim().toLowerCase();
    const currentTab = this.tabs[this.activeTabIndex];
    const recordFilterList = [];
    if (searchText) {
      recordFilterList.push({ field: 'externalId', value: searchText });
    } else if (this.tabs.length > 0 && currentTab) {
      currentTab.filters?.forEach((value, key) => {
        recordFilterList.push({ field: key, value });
      });
    }
    this.riderListIsLoading = true;

    if (!this.recordDefinitionKey) {
      this.riderListIsLoading = false;

      return;
    }

    this._workApiRoutesService
      .getRecords$(
        this.recordDefinitionKey,
        recordFilterList.some(f => f.field === 'status') ? recordFilterList.filter(f => f.field === 'status')[0].value : undefined,
        recordFilterList.some(f => f.field === 'externalId') ? recordFilterList.filter(f => f.field === 'externalId')[0].value : undefined,
        this.pagingRequestModel,
      )
      .pipe(
        take(1),
        tap(records => {
          this.riderListIsLoading = false;

          this.riders = records.items;
          this.pagingMetadata = records.pagingMetadata;

          const filterToMap = (obj: Record<string, string>): Map<string, string> => {
            return new Map(Object.entries(obj));
          };

          this.tabs = JSON.parse(this._tabsCopy).map((tab: INuverialTab) => {
            if (tab.filters) {
              tab.filters = filterToMap(tab.filters as unknown as Record<string, string>);
            }

            return tab;
          });

          if (searchText && this.riders.length === 1) {
            this.navigateToRiderDetails(records.items[0].id);

            return;
          } else if (searchText) {
            this.tabs.forEach(tab => {
              tab.count = 0;
            });
          }

          this._buildDataSourceTable();
          this._cdr.detectChanges();
        }),
        catchError(_ => {
          this.riderListIsLoading = false;
          this.riders = [];
          this.dataSourceTable = new MatTableDataSource<unknown>([]);
          if (this.pagingMetadata) {
            this.pagingMetadata.pageNumber = this.pagingRequestModel.pageNumber;
            this.pagingMetadata.pageSize = this.pagingRequestModel.pageSize;
          }
          this._cdr.detectChanges();
          this._nuverialSnackBarService.notifyApplicationError("Sorry, we're having trouble loading your records right now. Please try again later.");

          return of([]);
        }),
      )
      .subscribe();
  }

  public navigateToRiderDetails(recordId: string): void {
    this._router.navigate([`/riders/${recordId}`]);
  }

  public setPage($event: PageEvent): void {
    this.pagingRequestModel.pageSize = $event.pageSize;
    this.pagingRequestModel.pageNumber = $event.pageIndex;
    this.getRidersList();
  }

  public sortData($event: Sort): void {
    this.pagingRequestModel.sortBy = $event.active;
    this.pagingRequestModel.sortOrder = $event.direction.toUpperCase() as SortOrder;
    this.getRidersList();
  }

  public setSearchBoxIcon() {
    const searchText = this.searchInput.value ? this.searchInput.value.trim().toLowerCase() : '';
    this.searchBoxIcon = searchText ? 'cancel_outline' : 'search';
  }

  public clearSearch() {
    this.searchInput.setValue('');
    this.setSearchBoxIcon();
    this.getRidersList();
  }

  public async switchTabs(tab: MatTabChangeEvent) {
    this.activeTabIndex = tab.index;
    this.riderListIsLoading = true;
    await this._router?.navigate([], {
      queryParams: { pageNumber: 0, status: tab.tab.textLabel } as Params,
      queryParamsHandling: 'merge',
      relativeTo: this._activatedRoute,
    });
    this.pagingRequestModel.reset({
      pageSize: this.pagingRequestModel.pageSize,
    });
    this.getRidersList();
  }

  public trackByFn(index: number): number {
    return index;
  }

  public updateTabCounts(key: string): Observable<RecordListCountModel[]> {
    return this._ridersService.getRecordListTabCount$(key).pipe(
      tap((counts: DashboardCountModel[]) => {
        this.recordListCounts = counts;
      }),
      catchError(() => {
        this._nuverialSnackBarService.notifyApplicationError();

        return of([]);
      }),
    );
  }

  public getCountByTabLabel(tabLabel: string): number {
    const recordListCount = this.recordListCounts.find(count => count.tabLabel === tabLabel);

    return recordListCount ? recordListCount.count : 0;
  }

  public handleSearch() {
    this.pagingRequestModel.pageNumber = 0;
    this.getRidersList();
  }

  public ngOnDestroy(): void {
    this._ridersService.cleanUp();
  }

  private async _buildDataSourceTable(): Promise<void> {
    const recordTableData = [];
    for (const record of this.riders) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item: any = { id: record.id };

      for (const col of this.displayedColumns) {
        const value = this._getPropertyValueByPath(record, col.attributePath);

        switch (col.type as IColumnType | 'userdata') {
          case 'userdata':
            item[col.attributePath] = await firstValueFrom(this._userStateService.getUserDisplayName$(value));
            break;
          default:
            item[col.attributePath] = value;
            break;
        }
        if (col.attributePath === 'externalId') {
          item[col.attributePath] = item[col.attributePath].toUpperCase();
        }
      }

      recordTableData.push(item);
    }

    this.dataSourceTable = new MatTableDataSource<unknown>(recordTableData);
    this._cdr.detectChanges();
    this.sortDirection = this.pagingRequestModel.sortOrder.toLowerCase() as SortDirection;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _getPropertyValueByPath(object: IRecord, path: string): any {
    const pathArray = path.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = object;

    for (const prop of pathArray) {
      if (value && typeof value === 'object' && prop in value) {
        value = value[prop];
      } else {
        return undefined;
      }
    }

    return value;
  }

  private _setActiveTab() {
    const queryParams = this._activatedRoute.snapshot.queryParams;
    const activeTab = this.tabs.find(tab => queryParams[tab.key] === tab.value);

    if (activeTab) {
      this.activeTabIndex = this.tabs.indexOf(activeTab);
    }
  }
}
