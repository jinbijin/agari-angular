import { Action, State, StateContext, Store } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { AssertService } from 'src/app/core/services/assert.service';
import { ComparisonResult } from 'src/app/instrumentation/enum/comparison-result.enum';
import { EventPhase } from 'src/app/instrumentation/types/event-status/event-phase.enum';
import { GlobalState } from 'src/app/instrumentation/types/global-state/global-state.type';
import { StateNames } from 'src/app/instrumentation/types/global-state/state-names.type';
import { Participant } from 'src/app/instrumentation/types/participant.type';

import { EventStatusService } from '../../services/event-status.service';
import { EventManagerStateModel } from '../event-manager.state';

import { ClearParticipant, SetParticipant, UpdateParticipant } from './event-registration.actions';
import {
  defaultEventRegistrationStateModel,
  EventRegistrationStateModel,
} from './event-registration.state-model';

@State<EventRegistrationStateModel>({
  name: StateNames.eventRegistrationState,
  defaults: defaultEventRegistrationStateModel,
})
export class EventRegistrationState {
  constructor(
    private readonly store: Store,
    private readonly eventStatus: EventStatusService,
    private readonly assert: AssertService
  ) {}

  @Action(SetParticipant)
  public setParticipant(ctx: StateContext<EventManagerStateModel>, { payload }: SetParticipant): void {
    this.assertAfterSchedule();
    this.assertParticipantUndefined(ctx, payload.index);
    ctx.setState(
      patch({ participants: updateItem<Participant | undefined>(payload.index, payload.participant) })
    );
  }

  @Action(UpdateParticipant)
  public updateParticipant(ctx: StateContext<EventManagerStateModel>, { payload }: UpdateParticipant): void {
    this.assertBeforeFinished();
    this.assertParticipantSet(ctx, payload.index);
    ctx.setState(
      patch({ participants: updateItem<Participant | undefined>(payload.index, payload.participant) })
    );
  }

  @Action(ClearParticipant)
  public clearParticipant(ctx: StateContext<EventManagerStateModel>, { payload }: ClearParticipant): void {
    this.assertBeforeRound();
    this.assertParticipantSet(ctx, payload.index);
    ctx.setState(patch({ participants: updateItem<Participant | undefined>(payload.index, undefined) }));
  }

  private assertParticipantUndefined(ctx: StateContext<EventManagerStateModel>, index: number): void {
    const participants = this.assertParticipantsSet(ctx);
    this.assert.undefined(participants[index], `Participant ${index + 1} has already been set.`);
  }

  private assertParticipantSet(ctx: StateContext<EventManagerStateModel>, index: number): void {
    const participants = this.assertParticipantsSet(ctx);
    this.assert.nonNullable(participants[index], `Participant ${index + 1} has not been set.`);
  }

  private assertParticipantsSet(ctx: StateContext<EventManagerStateModel>): (Participant | undefined)[] {
    const participants = ctx.getState().participants;
    this.assert.nonNullable(participants, `Participant array has not been initialized.`);
    return participants;
  }

  private assertAfterSchedule(): void {
    const status = this.store.selectSnapshot((state: GlobalState) => state[StateNames.eventStatusState])
      .status;
    if (this.eventStatus.compare(status, { phase: EventPhase.Registration }) === ComparisonResult.LessThan) {
      throw new Error('Players cannot be registered yet.');
    }
  }

  private assertBeforeRound(): void {
    const status = this.store.selectSnapshot((state: GlobalState) => state[StateNames.eventStatusState])
      .status;
    if (
      this.eventStatus.compare(status, { phase: EventPhase.Registration }) === ComparisonResult.GreaterThan
    ) {
      throw new Error('Players cannot be cleared anymore.');
    }
  }

  private assertBeforeFinished(): void {
    const status = this.store.selectSnapshot((state: GlobalState) => state[StateNames.eventStatusState])
      .status;
    if (this.eventStatus.compare(status, { phase: EventPhase.Finished }) === ComparisonResult.Equal) {
      throw new Error('Players cannot be changed anymore.');
    }
  }
}
