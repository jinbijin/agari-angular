import { Participant } from 'src/app/instrumentation/types/participant.type';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';

export class SetRoundParticipantCount {
  public static readonly type: string = '[EventManager] Set round participant count';
  constructor(public readonly payload?: RoundParticipantCount) {}
}

export class GenerateSchedule {
  public static readonly type: string = '[EventManager] Generate schedule';
  constructor() {}
}

export class UnsetSchedule {
  public static readonly type: string = '[EventManager] Unset schedule';
  constructor() {}
}

export class FinalizeConfiguration {
  public static readonly type: string = '[EventManager] Finalize configuration';
  constructor() {}
}

export class SetParticipant {
  public static readonly type: string = '[EventManager] Set participant';
  constructor(public readonly payload: { participant?: Participant; index: number }) {}
}

export class FinalizeRegistration {
  public static readonly type: string = '[EventManager] Finalize registration';
  constructor() {}
}
