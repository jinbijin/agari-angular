import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';

import { GenerateScheduleQuery } from '../../../graphql/generated/types';
import { ScheduleGeneratorState } from '../../store/schedule-generator.state';

@Component({
  selector: 'agari-schedule-generator-response',
  templateUrl: './schedule-generator-response.component.html',
  styleUrls: ['./schedule-generator-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorResponseComponent implements OnInit {
  @Select(ScheduleGeneratorState.result)
  public result: Observable<ApolloQueryResult<GenerateScheduleQuery>>;

  constructor() {}

  public ngOnInit(): void {}
}
