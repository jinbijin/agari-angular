import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  GenerateScheduleGQL,
  GenerateScheduleQuery,
  GenerateScheduleQueryVariables
} from 'src/app/graphql/generated/types';
import { Status } from 'src/app/instrumentation/enum/status.enum';
import { ObservableHelper } from 'src/app/instrumentation/observable/observable.helper';

import { GenerateSchedule } from './schedule-generator.action';

export interface ScheduleGeneratorStateModel {
  status: Status;
  payload: GenerateScheduleQueryVariables | null;
}

@State<ScheduleGeneratorStateModel>({
  name: 'scheduleGenerator',
  defaults: {
    status: Status.Idle,
    payload: null
  }
})
@Injectable()
export class ScheduleGeneratorState {
  @Selector()
  public static status(state: ScheduleGeneratorStateModel): Status {
    return state.status;
  }

  @Selector()
  public static payload(
    state: ScheduleGeneratorStateModel
  ): GenerateScheduleQueryVariables | null {
    return state.payload;
  }

  public constructor(
    private readonly generateScheduleGql: GenerateScheduleGQL
  ) {}

  @Action(GenerateSchedule)
  public generateSchedule(
    { patchState }: StateContext<ScheduleGeneratorStateModel>,
    { payload }: GenerateSchedule
  ): Observable<ApolloQueryResult<GenerateScheduleQuery>> {
    const observable = this.generateScheduleGql.fetch(payload);
    return ObservableHelper.setStatus(observable, value =>
      patchState({ status: value })
    ).pipe(finalize(() => patchState({ payload })));
  }
}