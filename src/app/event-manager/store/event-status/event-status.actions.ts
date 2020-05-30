import { EventStatus } from 'src/app/instrumentation/types/event-status/event-status.type';

const actionTag: string = '[EventStatus]';

export class Set {
  public static readonly type: string = `${actionTag} Set`;
  public constructor(public readonly payload: { status: EventStatus }) {}
}
