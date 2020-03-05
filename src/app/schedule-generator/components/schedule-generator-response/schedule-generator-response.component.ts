import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Status } from 'src/app/instrumentation/enum/status.enum';
import { ExcelExportConfiguration } from 'src/app/instrumentation/excel/excel-export-configuration.type';

import {
  GenerateScheduleGQL,
  GenerateScheduleQuery,
  GenerateScheduleQueryVariables
} from '../../../graphql/generated/types';
import { ScheduleGeneratorState } from '../../store/schedule-generator.state';

@Component({
  selector: 'agari-schedule-generator-response',
  templateUrl: './schedule-generator-response.component.html',
  styleUrls: ['./schedule-generator-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorResponseComponent implements OnInit {
  @Select(ScheduleGeneratorState.status)
  public status$: Observable<Status>;

  @Select(ScheduleGeneratorState.payload)
  public payload$: Observable<GenerateScheduleQueryVariables | null>;

  public result$: Observable<ApolloQueryResult<GenerateScheduleQuery>>;

  public export$: Observable<ExcelExportConfiguration>;

  public get filename(): string {
    return 'schedule';
  }

  constructor(private readonly generateScheduleGql: GenerateScheduleGQL) {}

  public ngOnInit(): void {
    this.result$ = this.payload$.pipe(
      filter(payload => !!payload),
      switchMap(payload =>
        this.generateScheduleGql.fetch(
          payload as GenerateScheduleQueryVariables, // payload is not null because of filter
          { fetchPolicy: 'cache-only' }
        )
      )
    );
    this.export$ = this.result$.pipe(
      map(result => ({
        data: result.data.generateSchedule.rounds.map(r =>
          r.games.flatMap(g => g.participantNrs)
        ),
        filename: [
          'schedule',
          result.data.generateSchedule.rounds.length,
          result.data.generateSchedule.rounds[0].games.length,
          new Date().toISOString()
        ].join('_'),
        sheetname: 'Schedule'
      }))
    );
  }
}
