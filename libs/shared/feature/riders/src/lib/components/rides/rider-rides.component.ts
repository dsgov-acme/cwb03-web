import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TransactionModel } from '@dsg/shared/data-access/work-api';
import { FormRendererComponent } from '@dsg/shared/feature/form-nuv';
import {
  INuverialTab,
  NuverialBreadcrumbComponent,
  NuverialIconComponent,
  NuverialSpinnerComponent,
  NuverialTabKeyDirective,
  NuverialTabsComponent,
} from '@dsg/shared/ui/nuverial';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
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
  ],
  selector: 'dsg-rider-rides',
  standalone: true,
  styleUrls: ['./rider-rides.component.scss'],
  templateUrl: './rider-rides.component.html',
})
export class RiderRidesComponent implements OnInit {
  public reservations$?: Observable<TransactionModel[]> = this._riderProfileService.reservations$;

  public tabs: INuverialTab[] = [
    { key: 'reservations', label: 'Reservations' },
    { key: 'history', label: 'Ride History' },
  ];

  constructor(private readonly _riderProfileService: RiderProfileService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  public ngOnInit() {}
}
