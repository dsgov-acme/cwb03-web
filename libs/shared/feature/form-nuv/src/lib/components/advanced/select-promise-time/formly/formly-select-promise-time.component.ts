import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PassengerAccomodations, PromiseTime, PromiseTimeRequest } from '@dsg/shared/data-access/work-api';
import { FormatDurationPipe, FormatTimePipe, INuverialRadioCard, NuverialRadioCardsComponent, NuverialSpinnerComponent } from '@dsg/shared/ui/nuverial';
import { FormlyModule } from '@ngx-formly/core';
import { Observable, map } from 'rxjs';
import { PromiseTimeService } from '../../../../services/promise-time.service';
import { FormlyBaseComponent } from '../../../base';
import { SelectPromiseTimeProperties } from '../models/formly-select-promise-time.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormlyModule, NuverialRadioCardsComponent, NuverialSpinnerComponent, FormatTimePipe, FormatDurationPipe],
  providers: [FormatTimePipe, FormatDurationPipe],
  selector: 'dsg-formly-select-promise-time',
  standalone: true,
  styleUrls: ['./formly-select-promise-time.component.scss'],
  templateUrl: './formly-select-promise-time.component.html',
})
export class FormlySelectPromiseTimeComponent extends FormlyBaseComponent<SelectPromiseTimeProperties> implements OnInit {
  public selectOptions$: Observable<INuverialRadioCard[]> = new Observable<INuverialRadioCard[]>();
  public promiseTimes$: Observable<PromiseTime[]> = new Observable<PromiseTime[]>();

  constructor(
    private readonly _promiseTimeService: PromiseTimeService,
    private readonly _formatTimePipe: FormatTimePipe,
    private readonly _formatDurationPipe: FormatDurationPipe,
  ) {
    super();
  }

  public get reviewDetails() {
    return this._promiseTimeService.getPromiseTimeById(this.formControl.value);
  }

  public get displayTextValue(): Observable<string | undefined> {
    return this.promiseTimes$.pipe(
      map((promiseTimes: PromiseTime[]) => promiseTimes.find(promiseTime => promiseTime.id === this.formControl.value) || {}),
      map((promiseTime: PromiseTime) => this._formatTimePipe.transform(promiseTime?.pickupTime)),
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
            content: `Arrive by ${this._formatTimePipe.transform(promiseTime?.dropTime)} - ${this._formatDurationPipe.transform(
              promiseTime.pickupTime,
              promiseTime.dropTime,
            )} trip`,
            title: `Pickup at ${this._formatTimePipe.transform(promiseTime?.pickupTime)}`,
            value: promiseTime.id || '',
          } as INuverialRadioCard;
        });
      }),
    );
  }

  public updateSelectedTime(value: string) {
    const promiseTime: PromiseTime | undefined = this._promiseTimeService.getPromiseTimeById(value);
    if (promiseTime) {
      this.model.promiseTime = promiseTime;
      delete this.model?.promiseTime?.route;
    }
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
    const requestTime = new Date(Date.UTC(year, month - 1, day, hours + 5, minutes)); // Add 5 hours for Eastern Time -> UTC

    return Math.floor(requestTime.getTime() / 1000);
  }
}
