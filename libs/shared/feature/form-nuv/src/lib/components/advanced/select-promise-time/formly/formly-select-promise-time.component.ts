import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PassengerAccomodations, PromiseTime, PromiseTimeRequest } from '@dsg/shared/data-access/work-api';
import { INuverialRadioCard, NuverialRadioCardsComponent, NuverialSpinnerComponent } from '@dsg/shared/ui/nuverial';
import { FormlyModule } from '@ngx-formly/core';
import { Observable, map } from 'rxjs';
import { PromiseTimeService } from '../../../../services/promise-time.service';
import { FormlyBaseComponent } from '../../../base';
import { SelectPromiseTimeProperties } from '../models/formly-select-promise-time.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormlyModule, NuverialRadioCardsComponent, NuverialSpinnerComponent],
  selector: 'dsg-formly-select-promise-time',
  standalone: true,
  styleUrls: ['./formly-select-promise-time.component.scss'],
  templateUrl: './formly-select-promise-time.component.html',
})
export class FormlySelectPromiseTimeComponent extends FormlyBaseComponent<SelectPromiseTimeProperties> implements OnInit {
  public selectOptions$: Observable<INuverialRadioCard[]> = new Observable<INuverialRadioCard[]>();
  public promiseTimes$: Observable<PromiseTime[]> = new Observable<PromiseTime[]>();

  constructor(private readonly _promiseTimeService: PromiseTimeService) {
    super();
  }

  public get reviewDetails() {
    const promiseTime: PromiseTime | undefined = this._promiseTimeService.getPromiseTimeById(this.formControl.value);
    if (promiseTime) {
      this.model.promiseTime = promiseTime;
      delete this.model?.promiseTime?.route;
    }

    return {
      label: `Pickup at ${this._formatTime(promiseTime?.pickupTime)}`,
      time: `Arrive by ${this._formatTime(promiseTime?.dropTime)} - ${this._formatDuration(promiseTime)} trip`,
    };
  }

  public get displayTextValue(): Observable<string | undefined> {
    return this.promiseTimes$.pipe(
      map((promiseTimes: PromiseTime[]) => promiseTimes.find(promiseTime => promiseTime.id === this.formControl.value) || {}),
      map((promiseTime: PromiseTime) => this._formatTime(promiseTime?.pickupTime)),
    );
  }

  public ngOnInit(): void {
    this.promiseTimes$ = this._promiseTimeService
      .getPromiseTimesForNewReservation$(this._buildPromiseTimeRequest())
      .pipe(map(response => response.promises || []));
    this.selectOptions$ = this.promiseTimes$.pipe(
      map((promiseTimes: PromiseTime[]) => {
        return promiseTimes.map((promiseTime: PromiseTime) => {
          return {
            content: `Arrive by ${this._formatTime(promiseTime?.dropTime)} - ${this._formatDuration(promiseTime)} trip`,
            title: `Pickup at ${this._formatTime(promiseTime?.pickupTime)}`,
            value: promiseTime.id || '',
          } as INuverialRadioCard;
        });
      }),
    );
  }

  private _buildPromiseTimeRequest(): PromiseTimeRequest {
    return {
      anchor: this.model.anchor,
      dropPlaceId: this.model.dropLocation?.placeId || this.model.dropLocation?.id,
      passengerAccommodations: this._buildPassengerAccommodations(),
      pickupPlaceId: this.model.pickLocation?.placeId || this.model.pickLocation?.id,
      requestTime: this._formatRequestTime(),
      riderId: this.model.rider?.id || '',
    };
  }

  private _buildPassengerAccommodations(): PassengerAccomodations {
    return {
      ambulatorySeats: this.model.rider?.accommodations?.ambSeats ? 1 : 0,
      companions: this.model.rider?.accommodations?.numCompanion || 0,
      wheelchairSeats: this.model.rider?.accommodations?.wcSeats ? 1 : 0,
    };
  }

  private _formatDuration(promiseTime?: PromiseTime): string {
    if (!promiseTime?.pickupTime || !promiseTime?.dropTime) {
      return '';
    }

    const startTime: number = promiseTime.pickupTime;
    const endTime: number = promiseTime.dropTime;
    const durationSeconds = endTime - startTime;

    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);

    let durationString = '';

    if (hours > 0) {
      durationString += `${hours}h `;
    }

    if (minutes > 0 || durationString === '') {
      durationString += `${minutes}m`;
    }

    return durationString.trim();
  }

  private _formatTime(epochSeconds?: number): string {
    if (!epochSeconds) {
      return 'Not Available';
    }
    const milliseconds = epochSeconds * 1000;
    const date = new Date(milliseconds);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    let period = 'am';
    if (hours >= 12) {
      period = 'pm';
      if (hours > 12) {
        hours -= 12;
      }
    }
    if (hours === 0) {
      hours = 12;
    }

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${hours}:${formattedMinutes}${period}`;
  }

  private _formatRequestTime(): number | undefined {
    if (!this.model.requestedTime || !this.model.requestedDate) {
      return undefined; // Handle case where either requestedTime or requestedDate is missing
    }

    // Split the requestedTime string into hours and minutes
    const timeParts = this.model.requestedTime.split(':').map(Number);
    if (timeParts.length < 2 || isNaN(timeParts[0]) || isNaN(timeParts[1])) {
      return undefined; // Handle case where requestedTime is not in the expected format
    }
    const [hours, minutes] = timeParts;

    // Split the requestedDate string into year, month, and day
    const dateParts = this.model.requestedDate.split('-').map(Number);
    if (dateParts.length !== 3 || isNaN(dateParts[0]) || isNaN(dateParts[1]) || isNaN(dateParts[2])) {
      return undefined; // Handle case where requestedDate is not in the expected format
    }
    const [year, month, day] = dateParts;

    // Create a new Date object with the provided year, month, day, hours, and minutes in Eastern Time Zone
    const requestTime = new Date(Date.UTC(year, month - 1, day, hours - 5, minutes)); // Subtract 5 hours for Eastern Time

    return Math.floor(requestTime.getTime() / 1000);
  }
}
