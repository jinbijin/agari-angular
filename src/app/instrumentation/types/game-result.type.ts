import { ParticipantResult } from './participant-result.type';

export interface GameResult {
  [K: number]: ParticipantResult;
}
