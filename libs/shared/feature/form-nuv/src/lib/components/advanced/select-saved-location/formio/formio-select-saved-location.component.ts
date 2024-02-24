import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INuverialSelectOption, NuverialCardContentDirective, NuverialSelectComponent } from '@dsg/shared/ui/nuverial';
import { Observable, map } from 'rxjs';
import { SavedLocationService } from '../../../../services/saved-location.service';
import { FormioBaseCustomComponent } from '../../../base';
import { MTALocation, SelectSavedLocationFieldProperties } from '../models/formly-select-saved-location.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NuverialSelectComponent, NuverialCardContentDirective],
  selector: 'dsg-formio-select-saved-location',
  standalone: true,
  styleUrls: ['./formio-select-saved-location.component.scss'],
  templateUrl: './formio-select-saved-location.component.html',
})
export class FormioSelectSavedLocationComponent extends FormioBaseCustomComponent<string, SelectSavedLocationFieldProperties> implements OnInit {
  public selectOptions$: Observable<INuverialSelectOption[]> = new Observable<INuverialSelectOption[]>();
  public savedLocations$: Observable<MTALocation[]> = new Observable<MTALocation[]>();

  constructor(private readonly _savedLocationService: SavedLocationService) {
    super();
  }

  public ngOnInit(): void {
    this.savedLocations$ = this._savedLocationService.getSavedLocations$('');
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
}
