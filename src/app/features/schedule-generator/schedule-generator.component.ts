import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoundRobinInputDirective } from 'src/app/widgets/round-robin-input/round-robin-input.directive';
import { ExcelExportConfiguration } from 'src/app/widgets/excel-export/excel-export-configuration.type';
import { ScheduleGeneratorStateModel } from './store/schedule-generator.state-model';
import { RoundRobinInputFormSubmitted } from './store/schedule-generator.actions';

@Component({
  templateUrl: './schedule-generator.component.html',
  styleUrls: ['./schedule-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleGeneratorComponent implements OnInit {
  @ViewChild('formContainer', { read: RoundRobinInputDirective }) formContainer: RoundRobinInputDirective;

  @Select(state => state.scheduleGenerator)
  readonly state$: Observable<ScheduleGeneratorStateModel>;

  public export$: Observable<ExcelExportConfiguration | undefined>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.export$ = this.state$.pipe(
      map(state =>
        state && state.status === 'DONE' && state.schedule
          ? {
              data: state.schedule.rounds.map(r => r.games.flatMap(g => g.participantNrs.map(x => x + 1))),
              filename: [
                'schedule',
                state.schedule.rounds.length,
                state.schedule.rounds[0].games.length,
                new Date().toISOString()
              ].join('_'),
              sheetname: 'Schedule'
            }
          : undefined
      )
    );
  }

  onSubmit(value: any): void {
    if (!this.formContainer.form.valid) {
      this.formContainer.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(new RoundRobinInputFormSubmitted(value));
  }
}
