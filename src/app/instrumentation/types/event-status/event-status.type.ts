export const enum EventPhase {
  Configuration = 1,
  ScheduleGeneration = 2,
  Registration = 3,
  Round = 4,
  Finished = 5,
}

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
  number: number;
}

export interface FinishedStatus {
  phase: EventPhase.Finished;
}

export type EventStatus =
  | ConfigurationStatus
  | ScheduleGenerationStatus
  | RegistrationStatus
  | RoundStatus
  | FinishedStatus;
