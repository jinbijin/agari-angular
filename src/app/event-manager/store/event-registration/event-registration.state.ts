import { Action, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { AssertService } from 'src/app/core/services/assert.service';
import { StateNames } from 'src/app/instrumentation/types/global-state/state-names.type';
import { Participant } from 'src/app/instrumentation/types/participant.type';

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
  constructor(private readonly assert: AssertService) {}

  @Action(SetParticipant)
  public setParticipant(ctx: StateContext<EventManagerStateModel>, { payload }: SetParticipant): void {
    this.assertParticipantUndefined(ctx, payload.index);
    ctx.setState(
      patch({ participants: updateItem<Participant | undefined>(payload.index, payload.participant) })
    );
  }

  @Action(UpdateParticipant)
  public updateParticipant(ctx: StateContext<EventManagerStateModel>, { payload }: UpdateParticipant): void {
    this.assertParticipantSet(ctx, payload.index);
    ctx.setState(
      patch({ participants: updateItem<Participant | undefined>(payload.index, payload.participant) })
    );
  }

  @Action(ClearParticipant)
  public clearParticipant(ctx: StateContext<EventManagerStateModel>, { payload }: ClearParticipant): void {
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
}
