import { Injectable } from '@angular/core';
import { Action, createSelector, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenerateScheduleGQL, Schedule } from 'src/app/graphql/generated/types';
import { GameResult } from 'src/app/instrumentation/types/game-result.type';
import { Participant } from 'src/app/instrumentation/types/participant.type';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';
import { RoundResult } from 'src/app/instrumentation/types/round-result.type';
import { ScheduleGameIndex } from 'src/app/instrumentation/types/schedule-game-index.type';

import {
  FinalizeConfiguration,
  FinalizeRegistration,
  GenerateSchedule,
  SetGameResult,
  SetParticipant,
  SetRoundParticipantCount,
  UnsetGameResult,
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
export class EventManagerState implements NgxsOnInit {
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
  public static result(state: EventManagerStateModel): (index: number) => RoundResult | undefined {
    return (index: number) => (state.results ? state.results[index] : undefined);
  }

  @Selector()
  public static gameResult(
    state: EventManagerStateModel
  ): (index: ScheduleGameIndex) => GameResult | undefined {
    return (index: ScheduleGameIndex) => {
      const roundResult = state.results ? state.results[index.roundIndex] : undefined;
      return roundResult ? roundResult[index.gameIndex] : undefined;
    };
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
  public ngxsOnInit(ctx: StateContext<EventManagerStateModel>) {
    ctx.setState({
      roundParticipantCount: {
        roundCount: 4,
        participantCount: 20
      },
      schedule: {
        rounds: [
          {
            games: [
              { participantNrs: [0, 1, 2, 3] },
              { participantNrs: [4, 5, 6, 7] },
              { participantNrs: [8, 9, 10, 11] },
              { participantNrs: [12, 13, 14, 15] },
              { participantNrs: [16, 17, 18, 19] }
            ]
          },
          {
            games: [
              { participantNrs: [1, 4, 10, 19] },
              { participantNrs: [3, 5, 8, 14] },
              { participantNrs: [7, 9, 12, 18] },
              { participantNrs: [2, 11, 13, 16] },
              { participantNrs: [0, 6, 15, 17] }
            ]
          },
          {
            games: [
              { participantNrs: [6, 8, 13, 19] },
              { participantNrs: [3, 10, 12, 17] },
              { participantNrs: [1, 7, 14, 16] },
              { participantNrs: [0, 5, 11, 18] },
              { participantNrs: [2, 4, 9, 15] }
            ]
          },
          {
            games: [
              { participantNrs: [1, 6, 11, 12] },
              { participantNrs: [5, 10, 15, 16] },
              { participantNrs: [0, 9, 14, 19] },
              { participantNrs: [3, 4, 13, 18] },
              { participantNrs: [2, 7, 8, 17] }
            ]
          }
        ]
      },
      participants: [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
        { name: 'D' },
        { name: 'E' },
        { name: 'F' },
        { name: 'G' },
        { name: 'H' },
        { name: 'I' },
        { name: 'J' },
        { name: 'K' },
        { name: 'L' },
        { name: 'M' },
        { name: 'N' },
        { name: 'O' },
        { name: 'P' },
        { name: 'Q' },
        { name: 'R' },
        { name: 'S' },
        { name: 'T' }
      ],
      results: [undefined, undefined, undefined, undefined],
      roundParticipantFlag: true,
      configurationFlag: true,
      registrationFlag: false
    });
  }

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

  @Action(SetGameResult)
  public setGameResult(ctx: StateContext<EventManagerStateModel>, { payload }: SetGameResult): void {
    ctx.setState(
      patch({
        results: updateItem<RoundResult | undefined>(
          payload.index.roundIndex,
          patch({
            games: updateItem<GameResult>(payload.index.gameIndex, payload.game)
          })
        )
      })
    );
  }

  @Action(UnsetGameResult)
  public unsetGameResult(ctx: StateContext<EventManagerStateModel>, { payload }: UnsetGameResult): void {
    const results = ctx.getState().results;
    const round = results ? results[payload.index.roundIndex] : undefined;
    const game = round?.games ? round.games[payload.index.gameIndex] : undefined;
    const keys = Object.keys(game as GameResult);
    const emptyGame = {
      [keys[0]]: undefined,
      [keys[1]]: undefined,
      [keys[2]]: undefined,
      [keys[3]]: undefined
    };
    ctx.setState(
      patch({
        results: updateItem<RoundResult | undefined>(
          payload.index.roundIndex,
          patch({
            games: updateItem<GameResult>(payload.index.gameIndex, emptyGame)
          })
        )
      })
    );
  }
}
