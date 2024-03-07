/* eslint-disable rxjs/no-subscribe-handlers */
/* eslint-disable @typescript-eslint/member-ordering */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationSkipped, Router, RouterModule } from '@angular/router';
import { FormModel, TransactionModel } from '@dsg/shared/data-access/work-api';
import { FormRendererComponent, FormRendererService } from '@dsg/shared/feature/form-nuv';
import { INuverialBreadCrumb, NuverialBreadcrumbComponent, NuverialSnackBarService, NuverialSpinnerComponent } from '@dsg/shared/ui/nuverial';
import { EMPTY, Observable, catchError, filter, switchMap, take, tap } from 'rxjs';
import { RiderProfileService } from '../../services';
import { IntakeFormComponent } from '../intake/intake-form.component';
import { RiderSummaryComponent } from '../summary';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormRendererComponent,
    NuverialSpinnerComponent,
    NuverialBreadcrumbComponent,
    RouterModule,
    IntakeFormComponent,
    RiderSummaryComponent,
  ],
  selector: 'dsg-intake-form-router',
  standalone: true,
  styleUrls: ['./new-ride-reservation.component.scss'],
  templateUrl: './new-ride-reservation.component.html',
})
export class NewRideReservationComponent implements OnInit, OnDestroy {
  public breadCrumbs: INuverialBreadCrumb[] = [];
  private readonly _resume = this._route.snapshot.queryParams['resume'];
  public loading = true;
  public loadTransactionDetails$ = new Observable<[FormModel, TransactionModel]>();

  public isRiderStatusRequestPending = false;

  public loadRiderDetails$ = this._route.paramMap.pipe(
    switchMap(params => {
      const riderId = params.get('recordId') ?? '';

      return this._riderProfileService.loadRiderDetails$(riderId).pipe(
        tap(() => (this.breadCrumbs = [{ label: 'Rider Profile', navigationPath: `/riders/${this._riderProfileService.recordId}/detail` }])),
        catchError(_error => {
          this._nuverialSnackBarService.notifyApplicationError();

          return EMPTY;
        }),
      );
    }),
  );

  constructor(
    private readonly _formRendererService: FormRendererService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _nuverialSnackBarService: NuverialSnackBarService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _riderProfileService: RiderProfileService,
  ) {}

  public ngOnInit(): void {
    // Prevent flickering of the child component before navigation finishes
    this._router.events
      .pipe(
        // NavigationSkipped the base route or refresh, NavigationEnd for all other child routes
        filter(e => e instanceof NavigationEnd || e instanceof NavigationSkipped),
        tap(() => {
          this.loading = false;
          this._changeDetectorRef.markForCheck();
        }),
        take(1),
      )
      .subscribe();

    this.loadRiderDetails$.pipe(take(1)).subscribe(rider => {
      this.loadTransactionDetails$ = this._route.paramMap.pipe(
        switchMap(params => {
          const transactionId = params.get('transactionId') ?? '';

          return this._formRendererService.loadTransactionDetailsWithRiderInfo$(transactionId, rider);
        }),
        catchError(_error => {
          this._nuverialSnackBarService.notifyApplicationError();

          return EMPTY;
        }),
        tap(([_, transactionModel]) => {
          if (transactionModel.activeTasks.length) {
            const editExtras = this._resume === 'true' ? { queryParams: { resume: this._resume }, replaceUrl: true } : { replaceUrl: true };
            this._router.navigate([`/riders/${this._riderProfileService.recordId}`, 'transaction', transactionModel.id], editExtras);
          } else {
            this._router.navigate([`/riders/${this._riderProfileService.recordId}`, 'transaction', transactionModel.id, 'readonly'], { replaceUrl: true });
          }
        }),
      );
    });
  }

  public ngOnDestroy(): void {
    this._formRendererService.cleanUp();
  }
}
