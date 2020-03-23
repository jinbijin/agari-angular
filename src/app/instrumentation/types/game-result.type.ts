import { ParticipantResult } from './participant-result.type';

export interface GameResult {
  [x: number]: ParticipantResult | undefined;
}
