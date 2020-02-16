import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  GenerateScheduleGQL,
  GenerateScheduleQuery
} from 'src/app/graphql/generated/types';

import { GenerateSchedule } from './schedule-generator.action';

export interface ScheduleGeneratorStateModel {
  result: ApolloQueryResult<GenerateScheduleQuery>;
}

@State<ScheduleGeneratorStateModel>({
  name: 'scheduleGenerator',
  defaults: undefined
})
@Injectable()
export class ScheduleGeneratorState {
  @Selector()
  public static result(
    state: ScheduleGeneratorStateModel
  ): ApolloQueryResult<GenerateScheduleQuery> {
    return state.result;
  }

  public constructor(
    private readonly generateScheduleGql: GenerateScheduleGQL
  ) {}

  @Action(GenerateSchedule)
  public generateSchedule(
    { patchState }: StateContext<ScheduleGeneratorStateModel>,
    { payload }: GenerateSchedule
  ): Observable<ApolloQueryResult<GenerateScheduleQuery>> {
    return this.generateScheduleGql
      .fetch(payload)
      .pipe(tap(result => patchState({ result })));
  }
}
