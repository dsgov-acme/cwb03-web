import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IRendererFormConfigurationSchema, RecordModel, TransactionData } from '@dsg/shared/data-access/work-api';
import { AgencyRiderDetailsReviewRendererOptions, FormRendererComponent, NuvalenceFormRendererOptions } from '@dsg/shared/feature/form-nuv';
import {
  INuverialTab,
  NuverialBreadcrumbComponent,
  NuverialIconComponent,
  NuverialSpinnerComponent,
  NuverialTabKeyDirective,
  NuverialTabsComponent,
} from '@dsg/shared/ui/nuverial';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, map, of } from 'rxjs';
import { RiderProfileService } from '../../services';
import { riderReviewFormConfiguration } from './rider-review-form-configuration.model';

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
  ],
  selector: 'dsg-rider-details',
  standalone: true,
  styleUrls: ['./rider-details.component.scss'],
  templateUrl: './rider-details.component.html',
})
export class RiderDetailsComponent implements OnInit {
  @Input()
  public rider: RecordModel = new RecordModel();

  public rendererOptions: NuvalenceFormRendererOptions = AgencyRiderDetailsReviewRendererOptions;
  public tabs: INuverialTab[] = [
    { key: 'information', label: 'Rider Information' },
    { key: 'eligibility', label: 'Eligibility & Certification' },
  ];

  public formRendererConfiguration$?: Observable<IRendererFormConfigurationSchema[]> = of(riderReviewFormConfiguration).pipe(
    map(formConfigurationModel => formConfigurationModel?.toReviewForm()),
  );

  public model$?: Observable<TransactionData> = this._riderProfileService.rider$.pipe(map(recordModel => recordModel.toTransactionModel().data));

  constructor(private readonly _riderProfileService: RiderProfileService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  public ngOnInit() {}
}
