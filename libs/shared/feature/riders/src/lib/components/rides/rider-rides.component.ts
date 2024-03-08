import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionModel, WorkApiRoutesService } from '@dsg/shared/data-access/work-api';
import { FormRendererComponent } from '@dsg/shared/feature/form-nuv';
import {
  INuverialTab,
  NuverialBreadcrumbComponent,
  NuverialButtonComponent,
  NuverialIconComponent,
  NuverialSnackBarService,
  NuverialSpinnerComponent,
  NuverialTabKeyDirective,
  NuverialTabsComponent,
} from '@dsg/shared/ui/nuverial';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EMPTY, Observable, catchError, take, tap } from 'rxjs';
import { RiderProfileService } from '../../services';
import { RiderReservationListComponent } from '../rider-reservation-list';
import { RiderRideHistoryComponent } from '../rider-ride-history';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormRendererComponent,
    NuverialSpinnerComponent,
    NuverialBreadcrumbComponent,
    NuverialTabsComponent,
    NuverialIconComponent,
    NuverialTabKeyDirective,
    RiderReservationListComponent,
    RiderRideHistoryComponent,
    NuverialButtonComponent,
  ],
  selector: 'dsg-rider-rides',
  standalone: true,
  styleUrls: ['./rider-rides.component.scss'],
  templateUrl: './rider-rides.component.html',
})
export class RiderRidesComponent implements OnInit {
  public reservations$?: Observable<TransactionModel[]> = this._riderProfileService.reservations$;
  public baseRoute = '';

  public tabs: INuverialTab[] = [
    { key: 'reservations', label: 'Reservations' },
    { key: 'history', label: 'Ride History' },
  ];

  private readonly _reservationKey = 'MTAReservation';

  constructor(
    private readonly _riderProfileService: RiderProfileService,
    private readonly _workApiRoutesService: WorkApiRoutesService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _nuverialSnackBarService: NuverialSnackBarService,
  ) {}

  public createNewReservation() {
    const data = new Map();
    data.set('riderId', this._riderProfileService.riderId);
    data.set('riderUserId', this._riderProfileService.riderUserId);
    this._workApiRoutesService
      .createTransaction$(this._reservationKey, data)
      .pipe(
        tap(transaction => this._router.navigate([`${this.baseRoute}/transaction/${transaction.id}`])),
        catchError(_error => {
          this._nuverialSnackBarService.notifyApplicationError();

          return EMPTY;
        }),
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this._route.parent?.paramMap
      .pipe(
        take(1),
        tap(params => {
          const riderId = params.get('recordId') ?? '';
          this.baseRoute = `/riders/${riderId}`;
        }),
      )
      .subscribe();
  }
}
