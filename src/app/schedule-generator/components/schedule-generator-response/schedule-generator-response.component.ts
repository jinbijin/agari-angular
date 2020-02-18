import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Status } from 'src/app/instrumentation/enum/status.enum';

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

  constructor(private readonly generateScheduleGql: GenerateScheduleGQL) {}

  public ngOnInit(): void {
    this.result$ = this.payload$.pipe(
      filter(payload => !!payload),
      switchMap(payload =>
        this.generateScheduleGql.fetch(
          payload as GenerateScheduleQueryVariables // payload is not null because of filter
        )
      )
    );
  }
}