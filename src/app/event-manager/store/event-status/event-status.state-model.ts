import { EventPhase, EventStatus } from 'src/app/instrumentation/types/event-status/event-status.type';

export interface EventStatusStateModel {
  status: EventStatus;
}

export const defaultEventStatusStateModel: EventStatusStateModel = {
  status: {
    phase: EventPhase.Configuration,
  },
};
