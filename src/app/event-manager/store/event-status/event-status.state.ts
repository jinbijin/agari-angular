import { Action, State, StateContext, Store } from '@ngxs/store';
import { EventPhase } from 'src/app/instrumentation/types/event-status/event-phase.enum';
import { EventStatus } from 'src/app/instrumentation/types/event-status/event-status.type';

import { EventStatusService } from '../../services/event-status.service';
import { EventConfigurationState } from '../event-configuration/event-configuration.state';
import { EventConfigurationStateModel } from '../event-configuration/event-configuration.state-model';

import { Finalize } from './event-status.actions';
import { defaultEventStatusStateModel, EventStatusStateModel } from './event-status.state-model';

@State<EventStatusStateModel>({
  name: 'eventStatus',
  defaults: defaultEventStatusStateModel,
})
export class EventStatusState {
  constructor(private readonly store: Store, private readonly eventStatus: EventStatusService) {}

  @Action(Finalize)
  public finalize(ctx: StateContext<EventStatusStateModel>, { payload }: Finalize): void {
    ctx.patchState({ status: this.nextStatus(payload) });
  }

  private nextStatus(status: EventStatus): EventStatus {
    switch (status.phase) {
      case EventPhase.Configuration:
        return { phase: EventPhase.ScheduleGeneration };
      case EventPhase.ScheduleGeneration:
        return { phase: EventPhase.Registration };
      case EventPhase.Registration:
        return { phase: EventPhase.Round, index: 0 };
      case EventPhase.Round:
        const roundCount = this.store.selectSnapshot<EventConfigurationStateModel>(EventConfigurationState)
          .roundParticipantCount?.roundCount;
        if (!roundCount) {
          throw new Error('Cannot proceed past this status if no round count is set.');
        }
        if (status.index < roundCount - 1) {
          return { phase: EventPhase.Round, index: status.index + 1 };
        }
        return { phase: EventPhase.Result };
      case EventPhase.Result:
        return { phase: EventPhase.Finished };
      default:
        throw new Error('Cannot proceed past this status.');
    }
  }
}
