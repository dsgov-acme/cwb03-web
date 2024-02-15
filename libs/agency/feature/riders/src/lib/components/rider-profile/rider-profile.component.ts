import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventsLogComponent } from '@dsg/shared/feature/events';
import { FormRendererComponent } from '@dsg/shared/feature/form-nuv';
import { RiderDetailsComponent, RiderProfileService, RiderSummaryComponent } from '@dsg/shared/feature/riders';
import {
  INavigableTab,
  INuverialBreadCrumb,
  NuverialBreadcrumbComponent,
  NuverialCopyButtonComponent,
  NuverialFooterActionsComponent,
  NuverialIconComponent,
  NuverialNavigableTabsComponent,
  NuverialPillComponent,
  NuverialSelectComponent,
  NuverialSnackBarService,
  NuverialSpinnerComponent,
  NuverialTabKeyDirective,
} from '@dsg/shared/ui/nuverial';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EMPTY, catchError, concatMap, of, switchMap, tap } from 'rxjs';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormRendererComponent,
    FormsModule,
    ReactiveFormsModule,
    NuverialCopyButtonComponent,
    NuverialSpinnerComponent,
    NuverialBreadcrumbComponent,
    NuverialIconComponent,
    NuverialTabKeyDirective,
    NuverialSelectComponent,
    NuverialPillComponent,
    RouterModule,
    EventsLogComponent,
    NuverialFooterActionsComponent,
    NuverialNavigableTabsComponent,
    RiderSummaryComponent,
    RiderDetailsComponent,
  ],
  selector: 'dsg-rider-profile',
  standalone: true,
  styleUrls: ['./rider-profile.component.scss'],
  templateUrl: './rider-profile.component.html',
})
export class RiderProfileComponent implements OnDestroy {
  public breadCrumbs: INuverialBreadCrumb[] = [{ label: 'Back To Riders List', navigationPath: `/riders` }];
  public rider$ = this._riderProfileService.rider$.pipe(
    tap(rider => {
      this.tabs = [
        { key: 'details', label: 'Details', relativeRoute: 'detail', useTransactionLabel: true },
        { key: 'rides', label: 'Rides', relativeRoute: 'rides', useTransactionLabel: true },
        { key: 'locations', label: 'Saved Locations', relativeRoute: 'locations', useTransactionLabel: true },
        { key: 'payments', label: 'Payments', relativeRoute: 'payments', useTransactionLabel: true },
        { key: 'communication', label: 'Communication Log', relativeRoute: 'communication', useTransactionLabel: true },
      ];
      this.baseRoute = `/riders/${rider.id}`;
    }),
    concatMap(recordModel => of(recordModel)),
  );

  public isRiderStatusRequestPending = false;

  public loadRiderDetails$ = this._route.paramMap.pipe(
    switchMap(params => {
      const riderId = params.get('recordId') ?? '';

      return this._riderProfileService.loadRiderDetails$(riderId).pipe(
        tap(rider => {
          this.tabs = [
            { key: 'details', label: 'Details', relativeRoute: 'detail', useTransactionLabel: true },
            { key: 'rides', label: 'Rides', relativeRoute: 'rides', useTransactionLabel: true },
            { key: 'locations', label: 'Saved Locations', relativeRoute: 'locations', useTransactionLabel: true },
            { key: 'payments', label: 'Payments', relativeRoute: 'payments', useTransactionLabel: true },
            { key: 'communication', label: 'Communication Log', relativeRoute: 'communication', useTransactionLabel: true },
          ];
          this.baseRoute = `/riders/${rider.id}`;
        }),
        catchError(_error => {
          this._nuverialSnackBarService.notifyApplicationError();

          return EMPTY;
        }),
      );
    }),
  );

  public tabs: INavigableTab[] = [];
  public baseRoute = '';

  constructor(
    private readonly _riderProfileService: RiderProfileService,
    private readonly _route: ActivatedRoute,
    private readonly _nuverialSnackBarService: NuverialSnackBarService,
  ) {}

  public ngOnDestroy(): void {
    this._riderProfileService.cleanUp();
  }

  public trackByFn(index: number): number {
    return index;
  }
}
