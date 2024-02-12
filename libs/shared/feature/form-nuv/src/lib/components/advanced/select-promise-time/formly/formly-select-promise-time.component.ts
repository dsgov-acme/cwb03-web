import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INuverialRadioCard, NuverialRadioCardsComponent } from '@dsg/shared/ui/nuverial';
import { FormlyModule } from '@ngx-formly/core';
import { Observable, map } from 'rxjs';
import { PromiseTimeService } from '../../../../services/promise-time.service';
import { FormlyBaseComponent } from '../../../base';
import { CardsFieldProperties, PromiseTime } from '../models/formly-select-promise-time.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormlyModule, NuverialRadioCardsComponent],
  selector: 'dsg-formly-select-promise-time',
  standalone: true,
  styleUrls: ['./formly-select-promise-time.component.scss'],
  templateUrl: './formly-select-promise-time.component.html',
})
export class FormlySelectPromiseTimeComponent extends FormlyBaseComponent<CardsFieldProperties> implements OnInit {
  constructor(private readonly _promiseTimeService: PromiseTimeService) {
    super();
  }

  public selectOptions$: Observable<INuverialRadioCard[]> = new Observable<INuverialRadioCard[]>();
  public promiseTimes$: Observable<PromiseTime[]> = new Observable<PromiseTime[]>();

  public ngOnInit(): void {
    this.promiseTimes$ = this._promiseTimeService.getPromiseTimesForNewReservation$('transactionid'); // TODO - real transactionid
    this.selectOptions$ = this.promiseTimes$.pipe(
      map(promiseTimes => {
        return promiseTimes.map(promiseTime => {
          return {
            content: promiseTime.anchor ?? '',
            title: promiseTime.time ?? '',
            value: promiseTime.id ?? '',
          };
        });
      }),
    );
  }

  public get reviewDetails() {
    return this._promiseTimeService.getPromiseTimeById(this.formControl.value);
  }

  public get displayTextValue(): Observable<string | undefined> {
    return this.promiseTimes$.pipe(map(times => times.find(time => time.id === this.formControl.value)?.time || ''));
  }
}
