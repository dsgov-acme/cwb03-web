import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INuverialRadioCard, NuverialRadioCardsComponent } from '@dsg/shared/ui/nuverial';
import { Observable, map } from 'rxjs';
import { PromiseTimeService } from '../../../../services/promise-time.service';
import { FormioBaseCustomComponent } from '../../../base';
import { CardsFieldProperties, PromiseTime } from '../models/formly-select-promise-time.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NuverialRadioCardsComponent],
  selector: 'dsg-formio-select-promise-time',
  standalone: true,
  styleUrls: ['./formio-select-promise-time.component.scss'],
  templateUrl: './formio-select-promise-time.component.html',
})
export class FormioSelectPromiseTimeComponent extends FormioBaseCustomComponent<string, CardsFieldProperties> implements OnInit {
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
}
