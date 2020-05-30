import { Participant } from 'src/app/instrumentation/types/participant.type';

export interface EventRegistrationStateModel {
  participants?: (Participant | undefined)[];
}

export const defaultEventRegistrationStateModel: EventRegistrationStateModel = {};
