import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MTALocation, WorkApiRoutesService } from '@dsg/shared/data-access/work-api';
import { FormRendererComponent } from '@dsg/shared/feature/form-nuv';
import { NuverialButtonComponent, NuverialIconComponent, NuverialSnackBarService, NuverialSpinnerComponent } from '@dsg/shared/ui/nuverial';
import { UntilDestroy } from '@ngneat/until-destroy';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
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
  public baseRoute = `/riders/${this._riderProfileService.recordId}`;
  private readonly _locationKey = 'MTALocation';

  constructor(
    private readonly _riderProfileService: RiderProfileService,
    private readonly _nuverialSnackBarService: NuverialSnackBarService,
    private readonly _workApiRoutesService: WorkApiRoutesService,
    private readonly _router: Router,
  ) {}

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

  public createNewLocation() {
    const data = new Map();
    data.set('riderId', this._riderProfileService.riderId);
    data.set('riderUserId', this._riderProfileService.riderUserId);
    this._workApiRoutesService
      .createTransaction$(this._locationKey, data)
      .pipe(
        tap(transaction => this._router.navigate([`${this.baseRoute}/transaction/${transaction.id}`])),
        catchError(_error => {
          this._nuverialSnackBarService.notifyApplicationError();

          return EMPTY;
        }),
      )
      .subscribe();
  }
}
