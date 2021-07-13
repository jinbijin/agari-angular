import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';

export class GenerateSchedule {
  public static readonly type: string = '[Schedule] Generate';
  public constructor(public payload: RoundParticipantCount) {}
}
