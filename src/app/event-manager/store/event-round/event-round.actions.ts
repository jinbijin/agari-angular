import { GameResult } from 'src/app/instrumentation/types/game-result.type';
import { ScheduleGameIndex } from 'src/app/instrumentation/types/schedule-game-index.type';

const actionTag: string = '[Round]';

export class SetGameResult {
  public static readonly type: string = `${actionTag} Set game result`;
  constructor(public readonly payload: { game: GameResult; index: ScheduleGameIndex }) {}
}

export class UpdateGameResult {
  public static readonly type: string = `${actionTag} Update game result`;
  constructor(public readonly payload: { game: GameResult; index: ScheduleGameIndex }) {}
}

export class ClearGameResult {
  public static readonly type: string = `${actionTag} Clear game result`;
  constructor(public readonly payload: { index: ScheduleGameIndex }) {}
}
