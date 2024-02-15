import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IRendererFormConfigurationSchema, TransactionMockWithDocuments } from '@dsg/shared/data-access/work-api';
import { AgencyDetailsReviewRendererOptions, FormRendererComponent, FormRendererService, NuvalenceFormRendererOptions } from '@dsg/shared/feature/form-nuv';
import {
  INuverialTab,
  NuverialBreadcrumbComponent,
  NuverialIconComponent,
  NuverialSpinnerComponent,
  NuverialTabKeyDirective,
  NuverialTabsComponent,
} from '@dsg/shared/ui/nuverial';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, map } from 'rxjs';

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
  public transactionMock = TransactionMockWithDocuments;

  public rendererOptions: NuvalenceFormRendererOptions = AgencyDetailsReviewRendererOptions;

  public formRendererConfiguration$?: Observable<IRendererFormConfigurationSchema[]> = this._formRendererService.formConfiguration$.pipe(
    map(formConfigurationModel => formConfigurationModel?.toReviewForm()),
  );

  public tabs: INuverialTab[] = [
    { key: 'information', label: 'Rider Information' },
    { key: 'eligibility', label: 'Eligibility & Certification' },
  ];

  constructor(private readonly _formRendererService: FormRendererService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  public ngOnInit() {}
}
