import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RecordModel } from '@dsg/shared/data-access/work-api';
import { NuverialAccordionComponent, NuverialIconComponent, NuverialPillComponent, NuverialSpinnerComponent } from '@dsg/shared/ui/nuverial';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, take } from 'rxjs';
import { RiderProfileService } from '../../services';

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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public rider$: Observable<RecordModel> = new Observable<RecordModel>();

  constructor(private readonly _riderProfileService: RiderProfileService, private readonly _changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    if (this.rider?.id) {
      this.riderModel = this.rider;
      this._changeDetectorRef.detectChanges();
    } else {
      this.rider$ = this._riderProfileService.rider$.pipe(take(1));

      // eslint-disable-next-line rxjs/no-subscribe-handlers
      this.rider$.subscribe(rider => {
        this.riderModel = rider;
        this._changeDetectorRef.detectChanges();
      });
    }
  }

  public ngOnDestroy(): void {
    this._riderProfileService.cleanUp();
  }
}
