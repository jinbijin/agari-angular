import { EventPhase } from './event-phase.enum';

export interface ConfigurationStatus {
  phase: EventPhase.Configuration;
}

export interface ScheduleGenerationStatus {
  phase: EventPhase.ScheduleGeneration;
}

export interface RegistrationStatus {
  phase: EventPhase.Registration;
}

export interface RoundStatus {
  phase: EventPhase.Round;
  index: number;
}

export interface ResultStatus {
  phase: EventPhase.Result;
}

export interface FinishedStatus {
  phase: EventPhase.Finished;
}

export type EventStatus =
  | ConfigurationStatus
  | ScheduleGenerationStatus
  | RegistrationStatus
  | RoundStatus
  | ResultStatus
  | FinishedStatus;
