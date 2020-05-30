import { Action, State, StateContext } from '@ngxs/store';

import { Set } from './event-status.actions';
import { defaultEventStatusStateModel, EventStatusStateModel } from './event-status.state-model';

@State<EventStatusStateModel>({
  name: 'eventStatus',
  defaults: defaultEventStatusStateModel,
})
export class EventStatusState {
  @Action(Set)
  public set(ctx: StateContext<EventStatusStateModel>, { payload }: Set): void {
    ctx.patchState({ status: payload.status });
  }
}
