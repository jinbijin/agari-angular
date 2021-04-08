import { GameResult } from 'src/app/instrumentation/types/game-result.type';
import { Participant } from 'src/app/instrumentation/types/participant.type';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';
import { ScheduleGameIndex } from 'src/app/instrumentation/types/schedule-game-index.type';

export class SetRoundParticipantCount {
  public static readonly type: string = '[EventManager] Set round participant count';
  public constructor(public readonly payload?: RoundParticipantCount) {}
}

export class GenerateSchedule {
  public static readonly type: string = '[EventManager] Generate schedule';
  public constructor() {}
}

export class UnsetSchedule {
  public static readonly type: string = '[EventManager] Unset schedule';
  public constructor() {}
}

export class FinalizeConfiguration {
  public static readonly type: string = '[EventManager] Finalize configuration';
  public constructor() {}
}

export class SetParticipant {
  public static readonly type: string = '[EventManager] Set participant';
  public constructor(public readonly payload: { participant?: Participant; index: number }) {}
}

export class FinalizeRegistration {
  public static readonly type: string = '[EventManager] Finalize registration';
  public constructor() {}
}

export class SetGameResult {
  public static readonly type: string = '[EventManager] Set game result';
  public constructor(public readonly payload: { game: GameResult; index: ScheduleGameIndex }) {}
}

export class UnsetGameResult {
  public static readonly type: string = '[EventManager] Unset game result';
  public constructor(public readonly payload: { index: ScheduleGameIndex }) {}
}

export class FinalizeRoundResult {
  public static readonly type: string = '[EventManager] Finalize round result';
  public constructor(public readonly payload: { index: number }) {}
}

export class FinalizeEvent {
  public static readonly type: string = '[EventManager] Finalize event';
  public constructor() {}
}
