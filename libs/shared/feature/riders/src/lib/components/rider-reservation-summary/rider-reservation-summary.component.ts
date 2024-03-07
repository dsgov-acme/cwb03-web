import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonAddress, MTALocation, TransactionModel } from '@dsg/shared/data-access/work-api';
import { FormRendererComponent } from '@dsg/shared/feature/form-nuv';
import {
  NuverialBreadcrumbComponent,
  NuverialDefaultPipe,
  NuverialIconComponent,
  NuverialPillComponent,
  NuverialSpinnerComponent,
  NuverialTabKeyDirective,
  NuverialTabsComponent,
} from '@dsg/shared/ui/nuverial';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormRendererComponent,
    NuverialSpinnerComponent,
    NuverialBreadcrumbComponent,
    NuverialPillComponent,
    NuverialTabsComponent,
    NuverialIconComponent,
    NuverialTabKeyDirective,
    DatePipe,
    NuverialDefaultPipe,
  ],
  selector: 'dsg-rider-reservation-summary',
  standalone: true,
  styleUrls: ['./rider-reservation-summary.component.scss'],
  templateUrl: './rider-reservation-summary.component.html',
})
export class RiderReservationSummaryComponent {
  @Input() public reservation: TransactionModel = new TransactionModel();

  constructor() {}

  public get pickUpLocation() {
    if (this.reservation.data['pickLocation']) {
      return this.reservation.data['pickLocation'];
    }

    return null;
  }

  public get pickupTime() {
    const promiseTime = <{ pickupTime?: number; dropTime?: number }>this.reservation.data['promiseTime'];
    if (promiseTime?.pickupTime) {
      return new Date(promiseTime.pickupTime * 1000);
    }

    return null;
  }

  public get dropoffTime() {
    const promiseTime = <{ pickupTime?: number; dropTime?: number }>this.reservation.data['promiseTime'];
    if (promiseTime?.dropTime) {
      return new Date(promiseTime.dropTime * 1000);
    }

    return null;
  }

  public get occupantCount() {
    const rider = <{ accommodations?: { numCompanion?: number } }>this.reservation.data.rider;
    if (rider?.accommodations?.numCompanion) {
      return 1 + rider.accommodations.numCompanion;
    }

    return 1;
  }

  public get pickupLocationName() {
    const pickupLocation = <MTALocation>this.reservation.data['pickLocation'];

    return pickupLocation?.name;
  }

  public get dropoffLocationName() {
    const dropoffLocation = <MTALocation>this.reservation.data['dropLocation'];

    return dropoffLocation?.name;
  }

  public get pickupLocationFullAddress() {
    const pickupLocation = <MTALocation>this.reservation.data['pickLocation'];
    const address = pickupLocation?.address;

    if (address) {
      return this._getFullAddress(address);
    }

    return null;
  }

  public get dropoffLocationFullAddress() {
    const dropoffLocation = <MTALocation>this.reservation.data['dropLocation'];
    const address = dropoffLocation?.address;

    if (address) {
      return this._getFullAddress(address);
    }

    return null;
  }

  public get tripDuration() {
    const pickupTime = this.pickupTime;
    const dropoffTime = this.dropoffTime;
    if (pickupTime && dropoffTime) {
      const difference = dropoffTime.getTime() - pickupTime.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let duration = '';
      if (days > 0) {
        duration = `${days} `;
        if (days > 1) {
          duration += ' days ';
        } else {
          duration += ' day ';
        }
      }
      if (hours > 0) {
        duration += `${hours} `;
        if (hours > 1) {
          duration += ` hrs `;
        } else {
          duration += ` hr `;
        }
      }
      if (minutes > 0) {
        duration += `${minutes} `;
        if (minutes > 1) {
          duration += ` mins `;
        } else {
          duration += ` min `;
        }
      }

      return duration;
    }

    return null;
  }

  public get tripStatus(): 'Ongoing' | 'Completed' | 'Scheduled' | 'Pending' | 'Cancelled' | null {
    const status = this.reservation.status;

    switch (status) {
      case 'CONFIRMED': {
        const now = new Date();
        const pickupTime: Date | null = this.pickupTime;
        const dropoffTime: Date | null = this.dropoffTime;
        if (pickupTime && dropoffTime) {
          if (pickupTime.getTime() <= now.getTime() && dropoffTime.getTime() >= now.getTime()) {
            return 'Ongoing';
          } else if (dropoffTime.getTime() < now.getTime()) {
            return 'Completed';
          }
        }

        return 'Scheduled';
      }
      case 'Draft':
        return 'Pending';
      case 'Cancelled':
        return 'Cancelled';
    }

    return null;
  }

  public get statusClass() {
    switch (this.tripStatus) {
      case 'Ongoing':
        return 'status-ongoing';
      case 'Completed':
        return 'status-completed';
      case 'Scheduled':
        return 'status-scheduled';
      case 'Pending':
        return 'status-pending';
      case 'Cancelled':
        return 'status-cancelled';
    }

    return '';
  }

  private _getFullAddress(address: CommonAddress): string {
    let addressStr = '';
    addressStr += address.addressLine1;

    if (address.addressLine2) {
      addressStr += ` ${address.addressLine2}`;
    }

    addressStr += ` ${address.city}, ${address.stateCode} ${address.postalCode}`;

    if (address.postalCodeExtension) {
      addressStr += `-${address.postalCodeExtension}`;
    }

    return addressStr;
  }
}
