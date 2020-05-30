import { RoundResult } from 'src/app/instrumentation/types/round-result.type';

export interface EventRoundStateModel {
  results?: (RoundResult | undefined)[];
}

export const defaultEventRoundStateModel: EventRoundStateModel = {};
