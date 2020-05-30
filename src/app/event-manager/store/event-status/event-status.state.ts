import { Action, State, StateContext, Store } from '@ngxs/store';
import { StateNames } from 'src/app/instrumentation/types/global-state/state-names.type';

import { EventStatusService } from '../../services/event-status.service';

import { Finalize } from './event-status.actions';
import { defaultEventStatusStateModel, EventStatusStateModel } from './event-status.state-model';

@State<EventStatusStateModel>({
  name: StateNames.eventStatusState,
  defaults: defaultEventStatusStateModel,
})
export class EventStatusState {
  constructor(private readonly eventStatus: EventStatusService) {}

  @Action(Finalize)
  public finalize(ctx: StateContext<EventStatusStateModel>, { payload }: Finalize): void {
    ctx.patchState({ status: this.eventStatus.next(payload) });
  }
}
