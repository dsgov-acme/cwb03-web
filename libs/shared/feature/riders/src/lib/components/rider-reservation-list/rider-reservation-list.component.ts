import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransactionModel } from '@dsg/shared/data-access/work-api';
import { FormRendererComponent } from '@dsg/shared/feature/form-nuv';
import {
  NuverialBreadcrumbComponent,
  NuverialIconComponent,
  NuverialSpinnerComponent,
  NuverialTabKeyDirective,
  NuverialTabsComponent,
} from '@dsg/shared/ui/nuverial';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { RiderProfileService } from '../../services';
import { RiderReservationSummaryComponent } from '../rider-reservation-summary';

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
    RiderReservationSummaryComponent,
  ],
  selector: 'dsg-rider-reservation-list',
  standalone: true,
  styleUrls: ['./rider-reservation-list.component.scss'],
  templateUrl: './rider-reservation-list.component.html',
})
export class RiderReservationListComponent {
  public reservations$?: Observable<TransactionModel[]> = this._riderProfileService.reservations$;

  constructor(private readonly _riderProfileService: RiderProfileService) {}

  public trackByFn(index: number) {
    return index;
  }
}
