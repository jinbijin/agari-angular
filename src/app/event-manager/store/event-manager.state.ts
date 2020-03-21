import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenerateScheduleGQL, Schedule } from 'src/app/graphql/generated/types';
import { Participant } from 'src/app/instrumentation/types/participant.type';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';
import { RoundResult } from 'src/app/instrumentation/types/round-result.type';

import {
  FinalizeConfiguration,
  FinalizeRegistration,
  GenerateSchedule,
  SetParticipant,
  SetRoundParticipantCount,
  UnsetSchedule
} from './event-manager.actions';

export interface EventManagerStateModel {
  roundParticipantCount?: RoundParticipantCount;
  schedule?: Schedule;
  participants?: (Participant | undefined)[];
  results?: (RoundResult | undefined)[];

  roundParticipantFlag: boolean;
  configurationFlag: boolean;
  registrationFlag: boolean;
}

@State({
  name: 'eventManager',
  defaults: { roundParticipantFlag: false, configurationFlag: false, registrationFlag: false }
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
  public static participant(state: EventManagerStateModel): (index: number) => Participant | undefined {
    return (index: number) => (state.participants ? state.participants[index] : undefined);
  }

  @Selector()
  public static results(state: EventManagerStateModel): (RoundResult | undefined)[] | undefined {
    return state.results;
  }

  @Selector()
  public static roundParticipantFlag(state: EventManagerStateModel): boolean {
    return state.roundParticipantFlag;
  }

  @Selector()
  public static configurationFlag(state: EventManagerStateModel): boolean {
    return state.configurationFlag;
  }

  @Selector()
  public static registrationFlag(state: EventManagerStateModel): boolean {
    return state.registrationFlag;
  }

  @Selector()
  public static registrationReady(state: EventManagerStateModel): boolean {
    return state.participants?.every(p => !!p) || false;
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
    const roundParticipantCount = ctx.getState().roundParticipantCount;
    ctx.patchState({
      configurationFlag: true,
      participants: [...new Array(roundParticipantCount?.participantCount)],
      results: [...new Array(roundParticipantCount?.roundCount)]
    });
  }

  @Action(SetParticipant)
  public setParticipant(ctx: StateContext<EventManagerStateModel>, { payload }: SetParticipant): void {
    ctx.setState(
      patch({ participants: updateItem<Participant | undefined>(payload.index, payload.participant) })
    );
  }

  @Action(FinalizeRegistration)
  public finalizeRegistration(ctx: StateContext<EventManagerStateModel>): void {
    ctx.patchState({
      registrationFlag: true,
      results: ctx.getState().schedule?.rounds.map(r => ({
        finalized: false,
        games: r.games.map(g => ({
          [g.participantNrs[0]]: undefined,
          [g.participantNrs[1]]: undefined,
          [g.participantNrs[2]]: undefined,
          [g.participantNrs[3]]: undefined
        }))
      }))
    });
  }
}
