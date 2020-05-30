import { Participant } from 'src/app/instrumentation/types/participant.type';

const actionTag: string = '[Registration]';

export class SetParticipant {
  public static readonly type: string = `${actionTag} Set participant`;
  constructor(public readonly payload: { participant: Participant; index: number }) {}
}

export class UpdateParticipant {
  public static readonly type: string = `${actionTag} Update participant`;
  constructor(public readonly payload: { participant: Participant; index: number }) {}
}

export class ClearParticipant {
  public static readonly type: string = `${actionTag} Clear participant`;
  constructor(public readonly payload: { index: number }) {}
}
