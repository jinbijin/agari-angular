import { Schedule } from 'src/app/graphql/generated/types';

export interface EventScheduleStateModel {
  schedule?: Schedule;
}

export const defaultEventScheduleStateModel: EventScheduleStateModel = {};
