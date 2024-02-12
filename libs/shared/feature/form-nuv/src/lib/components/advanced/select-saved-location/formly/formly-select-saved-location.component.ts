/* eslint-disable @typescript-eslint/dot-notation */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INuverialSelectOption, NuverialSelectComponent } from '@dsg/shared/ui/nuverial';
import { FormlyModule } from '@ngx-formly/core';

import { Observable, map } from 'rxjs';
import { SavedLocationService } from '../../../../services/saved-location.service';
import { FormlyBaseComponent } from '../../../base';
import { MTALocation, SelectSavedLocationFieldProperties } from '../models/formly-select-saved-location.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormlyModule, NuverialSelectComponent],
  selector: 'dsg-formly-select-saved-location',
  standalone: true,
  styleUrls: ['./formly-select-saved-location.component.scss'],
  templateUrl: './formly-select-saved-location.component.html',
})
export class FormlySelectSavedLocationComponent extends FormlyBaseComponent<SelectSavedLocationFieldProperties> implements OnInit {
  constructor(private readonly _savedLocationService: SavedLocationService) {
    super();
  }

  public countrySelectLabels = new Map();
  public selectOptions$: Observable<INuverialSelectOption[]> = new Observable<INuverialSelectOption[]>();
  public savedLocations$: Observable<MTALocation[]> = new Observable<MTALocation[]>();

  public ngOnInit(): void {
    this.savedLocations$ = this._savedLocationService.getSavedLocations$('userId'); // TODO - real userId
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

  public get reviewDetails() {
    // TODO: in the case of custom locations, use the google maps service and the location.externalId to get the civic address
    return this._savedLocationService.getSavedLocationById(this.formControl.value);
  }

  public get displayTextValue(): Observable<string | undefined> {
    return this.savedLocations$.pipe(map(locs => locs.find(loc => loc.id === this.formControl.value)?.name || ''));
  }
}