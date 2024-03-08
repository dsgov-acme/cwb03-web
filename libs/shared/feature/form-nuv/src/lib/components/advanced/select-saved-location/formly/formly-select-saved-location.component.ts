/* eslint-disable rxjs/no-subscribe-handlers */
/* eslint-disable @typescript-eslint/dot-notation */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INuverialSelectOption, NuverialSelectComponent } from '@dsg/shared/ui/nuverial';
import { FormlyModule } from '@ngx-formly/core';

import { UserStateService } from '@dsg/shared/feature/app-state';
import { Observable, map } from 'rxjs';
import { SavedLocationService } from '../../../../services/saved-location.service';
import { FormlyBaseComponent } from '../../../base';
import { LocationType, MTALocation, SelectSavedLocationFieldProperties } from '../models/formly-select-saved-location.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormlyModule, NuverialSelectComponent],
  selector: 'dsg-formly-select-saved-location',
  standalone: true,
  styleUrls: ['./formly-select-saved-location.component.scss'],
  templateUrl: './formly-select-saved-location.component.html',
})
export class FormlySelectSavedLocationComponent extends FormlyBaseComponent<SelectSavedLocationFieldProperties> implements OnInit {
  public countrySelectLabels = new Map();
  public selectOptions$: Observable<INuverialSelectOption[]> = new Observable<INuverialSelectOption[]>();
  public savedLocations$: Observable<MTALocation[]> = new Observable<MTALocation[]>();

  constructor(private readonly _savedLocationService: SavedLocationService, private readonly _userStateService: UserStateService) {
    super();
  }

  public get reviewDetails() {
    const selectedLocation = this._savedLocationService.getSavedLocationById(this.formControl.value);
    if (!selectedLocation) {
      return;
    }

    return selectedLocation;
  }

  public get displayTextValue(): Observable<string | undefined> {
    return this.savedLocations$.pipe(map(locs => locs.find(loc => loc.id === this.formControl.value)?.name || ''));
  }

  public ngOnInit(): void {
    if (this.model?.rider?.id) {
      this.savedLocations$ = this._savedLocationService.getSavedLocationsByRiderId$(this.model.rider.id);
    } else {
      // eslint-disable-next-line rxjs/no-subscribe-handlers
      this._userStateService.user$.subscribe(user => {
        this.savedLocations$ = this._savedLocationService.getSavedLocationsByUserId$(user?.id || '');
      });
    }

    this.selectOptions$ = this.savedLocations$.pipe(
      map(locations => {
        return locations.map(location => {
          return {
            disabled: false,
            displayTextValue: location.name ?? '',
            key: location.id ?? '',
            selected: false,
          };
        });
      }),
    );
  }

  public updateSelectedLocation(selected: string) {
    const selectedLocation = this._savedLocationService.getSavedLocationById(selected);
    if (!selectedLocation) {
      return;
    }

    if (this.field?.key === 'pickLocation.id') {
      this.model.pickLocation = selectedLocation;
      this.model.pickLocation.locationType = LocationType.SavedLocation;
    } else if (this.field?.key === 'dropLocation.id') {
      this.model.dropLocation = selectedLocation;
      this.model.dropLocation.locationType = LocationType.SavedLocation;
    }
  }
}
