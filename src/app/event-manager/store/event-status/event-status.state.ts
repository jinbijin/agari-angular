import { Action, State, StateContext } from '@ngxs/store';

import { Finalize } from './event-status.actions';
import { defaultEventStatusStateModel, EventStatusStateModel } from './event-status.state-model';

@State<EventStatusStateModel>({
  name: 'eventStatus',
  defaults: defaultEventStatusStateModel,
})
export class EventStatusState {
  @Action(Finalize)
  public finalize(ctx: StateContext<EventStatusStateModel>, { payload }: Finalize): void {
    ctx.patchState({ status: payload });
  }
}
