/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormatDurationPipe, FormatTimePipe, NuverialRemoveUnderscoresPipe, NuverialSafeTitlecasePipe, NuverialYesNoPipe } from '../../pipes';
import { NuverialIconComponent } from '../icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormatTimePipe,
    FormatDurationPipe,
    NuverialIconComponent,
    NuverialRemoveUnderscoresPipe,
    NuverialYesNoPipe,
    NuverialSafeTitlecasePipe,
  ],
  selector: 'nuverial-ride-summary',
  standalone: true,
  styleUrls: ['./ride-summary.component.scss'],
  templateUrl: './ride-summary.component.html',
})
export class NuverialRideSummaryComponent {
  @Input() public model: any;

  public get pickupAddress(): string {
    let fullAddress = '';
    fullAddress += this.model?.pickLocation?.address?.addressLine1;
    if (this.model?.pickLocation?.address?.addressLine2) {
      fullAddress += ` ${this.model?.pickLocation?.address.addressLine2}`;
    }

    return fullAddress;
  }

  public get dropAddress(): string {
    let fullAddress = '';
    fullAddress += this.model?.dropLocation?.address?.addressLine1;
    if (this.model?.dropLocation?.address?.addressLine2) {
      fullAddress += ` ${this.model?.dropLocation?.address.addressLine2}`;
    }

    return fullAddress;
  }
}
