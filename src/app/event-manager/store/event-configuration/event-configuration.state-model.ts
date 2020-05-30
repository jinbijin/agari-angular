import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';

export interface EventConfigurationStateModel {
  roundParticipantCount?: RoundParticipantCount;
}

export const defaultEventConfigurationStateModel: EventConfigurationStateModel = {};
