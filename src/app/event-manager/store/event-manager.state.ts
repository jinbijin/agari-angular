import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenerateScheduleGQL, Schedule } from 'src/app/graphql/generated/types';
import { Participant } from 'src/app/instrumentation/types/participant.type';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';

import {
  FinalizeConfiguration,
  GenerateSchedule,
  SetParticipant,
  SetRoundParticipantCount,
  UnsetSchedule
} from './event-manager.actions';

export interface EventManagerStateModel {
  roundParticipantCount?: RoundParticipantCount;
  schedule?: Schedule;
  participants?: (Participant | undefined)[];

  roundParticipantFlag: boolean;
  configurationFlag: boolean;
}

@State({
  name: 'eventManager',
  defaults: { roundParticipantFlag: false, configurationFlag: false }
})
@Injectable()
export class EventManagerState {
  @Selector()
  public static roundParticipantCount(state: EventManagerStateModel): RoundParticipantCount | undefined {
    return state.roundParticipantCount;
  }

  @Selector()
  public static schedule(state: EventManagerStateModel): Schedule | undefined {
    return state.schedule;
  }

  @Selector()
  public static participants(state: EventManagerStateModel): (Participant | undefined)[] | undefined {
    return state.participants;
  }

  @Selector()
  public static roundParticipantFlag(state: EventManagerStateModel): boolean {
    return state.roundParticipantFlag;
  }

  @Selector()
  public static configurationFlag(state: EventManagerStateModel): boolean {
    return state.configurationFlag;
  }

  constructor(private readonly generateScheduleGql: GenerateScheduleGQL) {}

  @Action(SetRoundParticipantCount)
  public setRoundParticipantCount(
    ctx: StateContext<EventManagerStateModel>,
    { payload }: SetRoundParticipantCount
  ): void {
    ctx.patchState({ roundParticipantCount: payload, roundParticipantFlag: true });
  }

  @Action(GenerateSchedule)
  public generateSchedule(ctx: StateContext<EventManagerStateModel>): Observable<void> {
    return this.generateScheduleGql
      .fetch(ctx.getState().roundParticipantCount, { fetchPolicy: 'network-only' })
      .pipe(
        map(response => {
          ctx.patchState({ schedule: response.data.generateSchedule });
        })
      );
  }

  @Action(UnsetSchedule)
  public unsetSchedule(ctx: StateContext<EventManagerStateModel>): void {
    ctx.patchState({ schedule: undefined });
  }

  @Action(FinalizeConfiguration)
  public finalizeConfiguration(ctx: StateContext<EventManagerStateModel>): void {
    ctx.patchState({
      configurationFlag: true,
      participants: [...new Array(ctx.getState().roundParticipantCount?.participantCount)]
    });
  }

  @Action(SetParticipant)
  public setParticipant(ctx: StateContext<EventManagerStateModel>, { payload }: SetParticipant): void {
    ctx.setState(
      patch({ participants: updateItem<Participant | undefined>(payload.key, payload.participant) })
    );
  }
}
