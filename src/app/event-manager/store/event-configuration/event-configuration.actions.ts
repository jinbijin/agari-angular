import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';

const actionTag: string = '[EventConfiguration]';

export class SetRoundParticipantCount {
  public static readonly type: string = `${actionTag} Set round and participant counts`;
  constructor(public readonly payload: RoundParticipantCount) {}
}

export class UpdateRoundParticipantCount {
  public static readonly type: string = `${actionTag} Update round and participant counts`;
  constructor(public readonly payload: RoundParticipantCount) {}
}

export class ClearRoundParticipantCount {
  public static readonly type: string = `${actionTag} Clear round and participant counts`;
}
