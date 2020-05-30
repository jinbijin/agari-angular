import { Action, State, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { AssertService } from 'src/app/core/services/assert.service';
import { GameResult } from 'src/app/instrumentation/types/game-result.type';
import { StateNames } from 'src/app/instrumentation/types/global-state/state-names.type';
import { RoundResult } from 'src/app/instrumentation/types/round-result.type';
import { ScheduleGameIndex } from 'src/app/instrumentation/types/schedule-game-index.type';

import { EventManagerStateModel } from '../event-manager.state';

import { ClearGameResult, SetGameResult, UpdateGameResult } from './event-round.actions';
import { defaultEventRoundStateModel, EventRoundStateModel } from './event-round.state-model';

@State<EventRoundStateModel>({
  name: StateNames.eventRoundState,
  defaults: defaultEventRoundStateModel,
})
export class EventRoundState {
  constructor(private readonly assert: AssertService) {}

  @Action(SetGameResult)
  public setGameResult(ctx: StateContext<EventManagerStateModel>, { payload }: SetGameResult): void {
    this.assertGameResultUndefined(ctx, payload.index);
    this.updateGameResultState(ctx, payload.index, payload.game);
  }

  @Action(UpdateGameResult)
  public updateGameResult(ctx: StateContext<EventManagerStateModel>, { payload }: UpdateGameResult): void {
    this.assertGameResultSet(ctx, payload.index);
    this.updateGameResultState(ctx, payload.index, payload.game);
  }

  @Action(ClearGameResult)
  public clearGameResult(ctx: StateContext<EventManagerStateModel>, { payload }: ClearGameResult): void {
    this.assertGameResultSet(ctx, payload.index);
    const game = this.assertGameInitialized(ctx, payload.index);
    const keys = Object.keys(game);
    this.assert.areEqual(4, keys.length);
    const emptyGame = {
      [keys[0]]: undefined,
      [keys[1]]: undefined,
      [keys[2]]: undefined,
      [keys[3]]: undefined,
    };
    this.updateGameResultState(ctx, payload.index, emptyGame);
  }

  private updateGameResultState(
    ctx: StateContext<EventManagerStateModel>,
    index: ScheduleGameIndex,
    game: GameResult
  ): void {
    ctx.setState(
      patch({
        results: updateItem<RoundResult | undefined>(
          index.roundIndex,
          patch({
            games: updateItem<GameResult>(index.gameIndex, game),
            gameSet: updateItem<boolean>(index.gameIndex, true),
          })
        ),
      })
    );
  }

  private assertGameResultSet(ctx: StateContext<EventRoundStateModel>, index: ScheduleGameIndex): void {
    const game = this.assertGameInitialized(ctx, index);
    const keys = Object.keys(game);
    this.assert.areEqual(4, keys.length);
    for (const key of keys) {
      this.assert.nonNullable(
        game[key],
        `Results for player ${key + 1} in round ${index.roundIndex + 1}, game ${
          index.gameIndex + 1
        } has not been set.`
      );
    }
  }

  private assertGameResultUndefined(ctx: StateContext<EventRoundStateModel>, index: ScheduleGameIndex): void {
    const game = this.assertGameInitialized(ctx, index);
    const keys = Object.keys(game);
    this.assert.areEqual(4, keys.length);
    for (const key of keys) {
      this.assert.undefined(
        game[key],
        `Results for player ${key + 1} in round ${index.roundIndex + 1}, game ${
          index.gameIndex + 1
        } has already been set.`
      );
    }
  }

  private assertGameInitialized(
    ctx: StateContext<EventRoundStateModel>,
    index: ScheduleGameIndex
  ): GameResult {
    const results = ctx.getState().results;
    this.assert.nonNullable(results, 'Result have not been initialized.');
    const games = results[index.roundIndex]?.games;
    this.assert.nonNullable(games, `Round ${index.roundIndex + 1} has not been initialized.`);
    const game = games[index.gameIndex];
    this.assert.nonNullable(
      game,
      `Round ${index.roundIndex + 1}, game ${index.gameIndex + 1} has not been initialized.`
    );
    return game;
  }
}
