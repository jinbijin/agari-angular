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
  constructor(private readonly store: Store, private readonly eventStatus: EventStatusService) {}

  @Action(SetRoundParticipantCount)
  public setRoundParticipantCount(
    ctx: StateContext<EventConfigurationStateModel>,
    { payload }: SetRoundParticipantCount
  ): void {
    this.assertClear(ctx);
    ctx.patchState({ roundParticipantCount: payload });
  }

  @Action(UpdateRoundParticipantCount)
  public updateRoundParticipantCount(
    ctx: StateContext<EventConfigurationStateModel>,
    { payload }: UpdateRoundParticipantCount
  ): void {
    this.assertSet(ctx);
    this.assertNotFinalized();
    ctx.patchState({ roundParticipantCount: payload });
  }

  @Action(ClearRoundParticipantCount)
  public clearRoundParticipantCount(ctx: StateContext<EventConfigurationStateModel>): void {
    this.assertSet(ctx);
    this.assertNotFinalized();
    ctx.patchState({ roundParticipantCount: undefined });
  }

  private assertClear(ctx: StateContext<EventConfigurationStateModel>): void {
    if (ctx.getState().roundParticipantCount) {
      throw new Error('Round and participant counts are already set.');
    }
  }

  private assertSet(ctx: StateContext<EventConfigurationStateModel>): void {
    if (!ctx.getState().roundParticipantCount) {
      throw new Error('Round and participant counts are not set.');
    }
  }

  private assertNotFinalized(): void {
    const status = this.store.selectSnapshot<EventStatusStateModel>(EventStatusState).status;
    if (
      this.eventStatus.compare(status, { phase: EventPhase.ScheduleGeneration }) ===
      ComparisonResult.GreaterThan
    ) {
      throw new Error('Configuration can not be changed anymore.');
    }
  }
}
