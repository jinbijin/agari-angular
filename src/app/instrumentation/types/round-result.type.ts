import { GameResult } from './game-result.type';

export interface RoundResult {
  games: GameResult[];
  finalized: boolean;
  gameSet: boolean[];
}
