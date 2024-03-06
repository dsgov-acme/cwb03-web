import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MTALocation } from '@dsg/shared/data-access/work-api';
import { NuverialButtonComponent, NuverialIconComponent } from '@dsg/shared/ui/nuverial';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NuverialButtonComponent, NuverialIconComponent],
  selector: 'dsg-rider-saved-location-card',
  standalone: true,
  styleUrls: ['./rider-saved-location-card.component.scss'],
  templateUrl: './rider-saved-location-card.component.html',
})
export class RiderSavedLocationCardComponent {
  public fullAddress = '';
  private _location: MTALocation = {};
  @Input()
  public get location(): MTALocation {
    return this._location;
  }
  public set location(location: MTALocation) {
    this._location = location;
    let fullAddress = '';
    fullAddress += location?.address?.addressLine1;
    if (location?.address?.addressLine2) {
      fullAddress += ` ${location?.address.addressLine2}`;
    }
    this.fullAddress = fullAddress;
  }
}
