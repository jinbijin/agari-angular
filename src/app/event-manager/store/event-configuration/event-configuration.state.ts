import { Action, State, StateContext, Store } from '@ngxs/store';
import { ComparisonResult } from 'src/app/instrumentation/enum/comparison-result.enum';
import { EventPhase } from 'src/app/instrumentation/types/event-status/event-status.type';

import { EventStatusService } from '../../services/event-status.service';
import { EventStatusState } from '../event-status/event-status.state';
import { EventStatusStateModel } from '../event-status/event-status.state-model';

import {
  ClearRoundParticipantCount,
  SetRoundParticipantCount,
  UpdateRoundParticipantCount,
} from './event-configuration.actions';
import {
  defaultEventConfigurationStateModel,
  EventConfigurationStateModel,
} from './event-configuration.state-model';

@State<EventConfigurationStateModel>({
  name: 'eventConfiguration',
  defaults: defaultEventConfigurationStateModel,
})
export class EventConfigurationState {
  private readonly finalizedErrorMessage: string = 'Configuration cannot be changed anymore.';

  constructor(private readonly store: Store, private readonly eventStatus: EventStatusService) {}

  @Action(SetRoundParticipantCount)
  public setRoundParticipantCount(
    ctx: StateContext<EventConfigurationStateModel>,
    { payload }: SetRoundParticipantCount
  ): void {
    if (ctx.getState().roundParticipantCount) {
      throw new Error('Round and participant count is already set.');
    }
    ctx.patchState({ roundParticipantCount: payload });
  }

  @Action(UpdateRoundParticipantCount)
  public updateRoundParticipantCount(
    ctx: StateContext<EventConfigurationStateModel>,
    { payload }: UpdateRoundParticipantCount
  ): void {
    this.assertNotFinalized();
    ctx.patchState({ roundParticipantCount: payload });
  }

  @Action(ClearRoundParticipantCount)
  public clearRoundParticipantCount(ctx: StateContext<EventConfigurationStateModel>): void {
    this.assertNotFinalized();
    ctx.patchState({ roundParticipantCount: undefined });
  }

  private assertNotFinalized(): void {
    const status = this.store.selectSnapshot<EventStatusStateModel>(EventStatusState).status;
    if (
      this.eventStatus.compare(status, { phase: EventPhase.ScheduleGeneration }) ===
      ComparisonResult.GreaterThan
    ) {
      throw new Error(this.finalizedErrorMessage);
    }
  }
}
