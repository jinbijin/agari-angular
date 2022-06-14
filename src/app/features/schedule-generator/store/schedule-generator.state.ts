import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Status } from 'src/app/instrumentation/enum/status.enum';
import { ScheduleGeneratorApiService } from './schedule-generator-api.service';
import { ApiErrored, ApiResponded, RoundRobinInputFormSubmitted } from './schedule-generator.actions';
import { ScheduleGeneratorStateModel } from './schedule-generator.state-model';

@State<ScheduleGeneratorStateModel>({
  name: 'scheduleGenerator'
})
@Injectable()
export class ScheduleGeneratorState {
  constructor(private readonly scheduleGeneratorApi: ScheduleGeneratorApiService) { }

  @Action(RoundRobinInputFormSubmitted)
  roundRobinFormSubmitted(ctx: StateContext<ScheduleGeneratorStateModel>, { payload }: RoundRobinInputFormSubmitted): Observable<void> {
    return this.scheduleGeneratorApi.generateSchedule(payload);
  }

  @Action(ApiResponded)
  apiResponded(ctx: StateContext<ScheduleGeneratorStateModel>, { payload, request }: ApiResponded): void {
    if (payload.data) {
      ctx.setState({ status: Status.Done, request, schedule: payload.data });
    } else {
      ctx.setState({ status: Status.Failed, error: payload.error.message });
    }
  }

  @Action(ApiErrored)
  apiErrored(ctx: StateContext<ScheduleGeneratorStateModel>): void {
    ctx.setState({ status: Status.Failed, error: 'An unexpected error occurred while generating a schedule.' });
  }
}
