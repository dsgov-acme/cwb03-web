import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RecordModel } from '@dsg/shared/data-access/work-api';
import { NuverialAccordionComponent, NuverialIconComponent, NuverialPillComponent, NuverialSpinnerComponent } from '@dsg/shared/ui/nuverial';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, take } from 'rxjs';
import { RiderProfileService } from '../../services';

interface RiderAccommodations {
  hasDisabilities: boolean;
  hasMobilityDevices: boolean;
  hasPca: boolean;
  hasServiceAnimal: boolean;
  disabilities: string[];
  mobilityDevices: string[];
  emergencyContact?: {
    fullName: string;
    relationship: string;
    phone: string;
  };
}

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NuverialSpinnerComponent, NuverialIconComponent, NuverialPillComponent, MatExpansionModule, NuverialAccordionComponent],
  selector: 'dsg-rider-summary',
  standalone: true,
  styleUrls: ['./rider-summary.component.scss'],
  templateUrl: './rider-summary.component.html',
})
export class RiderSummaryComponent implements OnDestroy, OnInit {
  @Input()
  public rider: RecordModel = new RecordModel();

  @Input()
  public riderId = '';

  public riderModel: RecordModel = new RecordModel();

  public accommodations: RiderAccommodations = {
    disabilities: [],
    emergencyContact: undefined,
    hasDisabilities: false,
    hasMobilityDevices: false,
    hasPca: false,
    hasServiceAnimal: false,
    mobilityDevices: [],
  };

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public rider$: Observable<RecordModel> = new Observable<RecordModel>();

  constructor(private readonly _riderProfileService: RiderProfileService, private readonly _changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    if (this.rider?.id) {
      this.riderModel = this.rider;
      this._summarizeRider(this.riderModel);
      this._changeDetectorRef.detectChanges();
    } else {
      this.rider$ = this._riderProfileService.rider$.pipe(take(1));

      // eslint-disable-next-line rxjs/no-subscribe-handlers
      this.rider$.subscribe(rider => {
        this.riderModel = rider;
        this._summarizeRider(this.riderModel);
        this._changeDetectorRef.detectChanges();
      });
    }
  }

  public ngOnDestroy(): void {
    this._riderProfileService.cleanUp();
  }

  public trackByFn(index: number): number {
    return index;
  }

  private _summarizeRider(rider: RecordModel): void {
    if (rider.data['accommodations']) {
      const riderAccommodations = <{ disabilities?: string[]; mobilityDevices?: string[]; pcaRequired?: boolean; serviceAnimalRequired?: boolean }>(
        rider.data['accommodations']
      );
      this.accommodations.hasDisabilities = (riderAccommodations?.disabilities ?? []).length > 0;
      this.accommodations.hasMobilityDevices = (riderAccommodations?.mobilityDevices ?? []).length > 0;
      if (this.accommodations.hasDisabilities) {
        this.accommodations.disabilities = riderAccommodations.disabilities ?? [];
      }
      if (this.accommodations.hasMobilityDevices) {
        this.accommodations.mobilityDevices = riderAccommodations.mobilityDevices ?? [];
      }
      if (riderAccommodations.pcaRequired) {
        this.accommodations.hasPca = true;
      }
      if (riderAccommodations.serviceAnimalRequired) {
        this.accommodations.hasServiceAnimal = true;
      }
    }
    if (rider.data['emergencyContact']) {
      const riderEmergencyContact = <{ fullName: string; relationship: string; phone: string }>rider.data['emergencyContact'];
      this.accommodations.emergencyContact = {
        fullName: riderEmergencyContact.fullName,
        phone: riderEmergencyContact.phone,
        relationship: riderEmergencyContact.relationship,
      };
    }
  }
}
