import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INuverialRadioCard, NuverialRadioCardsComponent } from '@dsg/shared/ui/nuverial';
import { Observable, of } from 'rxjs';
import { FormioBaseCustomComponent } from '../../../base';
import { SelectPromiseTimeProperties } from '../models/formly-select-promise-time.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NuverialRadioCardsComponent],
  selector: 'dsg-formio-select-promise-time',
  standalone: true,
  styleUrls: ['./formio-select-promise-time.component.scss'],
  templateUrl: './formio-select-promise-time.component.html',
})
export class FormioSelectPromiseTimeComponent extends FormioBaseCustomComponent<string, SelectPromiseTimeProperties> implements OnInit {
  public selectOptions$: Observable<INuverialRadioCard[]> = new Observable<INuverialRadioCard[]>();

  public ngOnInit(): void {
    // hard-coded - only used for display in the form builder
    this.selectOptions$ = of([
      {
        content: 'Arrive by 3:00pm - 45m trip',
        title: 'Pick up at 2:15pm',
        value: 'promiseTime1',
      },
      {
        content: 'Arrive by 3:45m - 1h trip',
        title: 'Pick up at 2:45pm',
        value: 'promiseTime2',
      },
      {
        content: 'Arrive by 3:30pm - 45m trip',
        title: 'Pick up at 2:45pm',
        value: 'promiseTime3',
      },
      {
        content: 'Arrive by 3:30pm - 1h trip',
        title: 'Pick up at 2:30pm',
        value: 'promiseTime4',
      },
    ]);
  }
}
