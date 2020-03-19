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
