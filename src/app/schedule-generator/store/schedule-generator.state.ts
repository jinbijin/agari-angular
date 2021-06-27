import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { EMPTY, Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Status } from 'src/app/instrumentation/enum/status.enum';
import { ObservableHelper } from 'src/app/instrumentation/observable/observable.helper';

import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';
import { ScheduleGeneratorService } from 'src/app/core/services/schedule-generator.service';
import { Response } from 'src/app/instrumentation/types/response/response.type';
import { RoundRobinSchedule } from 'src/app/instrumentation/types/schedule/round-robin-schedule.type';
import { ErrorData } from 'src/app/instrumentation/types/response/error-data.type';
import { GenerateSchedule } from './schedule-generator.action';

export interface ScheduleGeneratorStateModel {
  status: Status;
  payload: RoundParticipantCount | null;
  response: Response<RoundRobinSchedule, ErrorData> | null;
}

@State<ScheduleGeneratorStateModel>({
  name: 'scheduleGenerator',
  defaults: {
    status: Status.Idle,
    payload: null,
    response: null
  }
})
@Injectable()
export class ScheduleGeneratorState {
  public constructor(private readonly scheduleGenerator: ScheduleGeneratorService) {}

  @Selector()
  public static status(state: ScheduleGeneratorStateModel): Status {
    return state.status;
  }

  @Selector()
  public static payload(state: ScheduleGeneratorStateModel): RoundParticipantCount | null {
    return state.payload;
  }

  @Selector()
  public static response(state: ScheduleGeneratorStateModel): Response<RoundRobinSchedule, ErrorData> | null {
    return state.response;
  }

  @Action(GenerateSchedule)
  public generateSchedule(
    { patchState }: StateContext<ScheduleGeneratorStateModel>,
    { payload }: GenerateSchedule
  ): Observable<Response<RoundRobinSchedule, ErrorData>> {
    patchState({ status: Status.InProgress, payload, response: null });
    return this.scheduleGenerator.generateSchedule(payload).pipe(
      tap(response => patchState({ status: Status.Done, response })),
      catchError(err => {
        patchState({ status: Status.Failed })
        return EMPTY;
      })
    );
  }
}
