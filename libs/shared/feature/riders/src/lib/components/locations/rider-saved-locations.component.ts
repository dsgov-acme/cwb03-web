import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MTALocation } from '@dsg/shared/data-access/work-api';
import { FormRendererComponent } from '@dsg/shared/feature/form-nuv';
import { NuverialButtonComponent, NuverialIconComponent, NuverialSpinnerComponent } from '@dsg/shared/ui/nuverial';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { RiderProfileService } from '../../services';

@UntilDestroy()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormRendererComponent, NuverialSpinnerComponent, NuverialButtonComponent, NuverialIconComponent],
  selector: 'dsg-rider-saved-locations',
  standalone: true,
  styleUrls: ['./rider-saved-locations.component.scss'],
  templateUrl: './rider-saved-locations.component.html',
})
export class RiderSavedLocationsComponent implements OnInit {
  public locations$?: Observable<MTALocation[]> = this._riderProfileService.savedLocations$;

  constructor(private readonly _riderProfileService: RiderProfileService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  public ngOnInit() {}

  public getFullAddress(location: MTALocation): string {
    let fullAddress = '';
    fullAddress += location.address?.addressLine1;
    if (location.address?.addressLine2) {
      fullAddress += ` ${location.address.addressLine2}`;
    }

    return fullAddress;
  }

  public trackByFn(index: number) {
    return index;
  }
}
