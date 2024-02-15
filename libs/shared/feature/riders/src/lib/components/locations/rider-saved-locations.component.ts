import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormRendererComponent } from '@dsg/shared/feature/form-nuv';
import {
  NuverialBreadcrumbComponent,
  NuverialIconComponent,
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
    NuverialTabsComponent,
    NuverialIconComponent,
    NuverialTabKeyDirective,
  ],
  selector: 'dsg-rider-saved-locations',
  standalone: true,
  styleUrls: ['./rider-saved-locations.component.scss'],
  templateUrl: './rider-saved-locations.component.html',
})
export class RiderSavedLocationsComponent implements OnInit {
  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  public ngOnInit() {}
}
