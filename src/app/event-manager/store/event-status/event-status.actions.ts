import { EventStatus, FinishedStatus } from 'src/app/instrumentation/types/event-status/event-status.type';

const actionTag: string = '[EventStatus]';

export class Finalize {
  public static readonly type: string = `${actionTag} Finalize`;
  public constructor(public readonly payload: Exclude<EventStatus, FinishedStatus>) {}
}
