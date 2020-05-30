import { Action, State, StateContext, Store } from '@ngxs/store';
import { AssertService } from 'src/app/core/services/assert.service';
import { ComparisonResult } from 'src/app/instrumentation/enum/comparison-result.enum';
import { EventPhase } from 'src/app/instrumentation/types/event-status/event-phase.enum';
import { GlobalState } from 'src/app/instrumentation/types/global-state/global-state.type';
import { StateNames } from 'src/app/instrumentation/types/global-state/state-names.type';

import { EventStatusService } from '../../services/event-status.service';

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
  name: StateNames.eventConfigurationState,
  defaults: defaultEventConfigurationStateModel,
})
export class EventConfigurationState {
  constructor(
    private readonly store: Store,
    private readonly eventStatus: EventStatusService,
    private readonly assert: AssertService
  ) {}

  @Action(SetRoundParticipantCount)
  public setRoundParticipantCount(
    ctx: StateContext<EventConfigurationStateModel>,
    { payload }: SetRoundParticipantCount
  ): void {
    this.assertUndefined(ctx);
    ctx.patchState({ roundParticipantCount: payload });
  }

  @Action(UpdateRoundParticipantCount)
  public updateRoundParticipantCount(
    ctx: StateContext<EventConfigurationStateModel>,
    { payload }: UpdateRoundParticipantCount
  ): void {
    this.assertSet(ctx);
    this.assertScheduleGenerationNotFinalized();
    ctx.patchState({ roundParticipantCount: payload });
  }

  @Action(ClearRoundParticipantCount)
  public clearRoundParticipantCount(ctx: StateContext<EventConfigurationStateModel>): void {
    this.assertSet(ctx);
    this.assertScheduleGenerationNotFinalized();
    ctx.patchState({ roundParticipantCount: undefined });
  }

  private assertUndefined(ctx: StateContext<EventConfigurationStateModel>): void {
    this.assert.undefined(
      ctx.getState().roundParticipantCount,
      'Round and participant counts are already set.'
    );
  }

  private assertSet(ctx: StateContext<EventConfigurationStateModel>): void {
    this.assert.nonNullable(
      ctx.getState().roundParticipantCount,
      'Round and participant counts have not been set.'
    );
  }

  private assertScheduleGenerationNotFinalized(): void {
    const status = this.store.selectSnapshot((state: GlobalState) => state[StateNames.eventStatusState])
      .status;
    if (this.eventStatus.compare(status, { phase: EventPhase.Schedule }) === ComparisonResult.GreaterThan) {
      throw new Error('Configuration can not be changed anymore.');
    }
  }
}
