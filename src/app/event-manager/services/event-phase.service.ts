import { Injectable } from '@angular/core';
import { ComparisonResult } from 'src/app/instrumentation/enum/comparison-result.enum';
import { EventPhase } from 'src/app/instrumentation/types/event-status/event-phase.enum';

export interface EventPhaseService {
  index(phase: EventPhase.Configuration): 0;
  index(phase: EventPhase.ScheduleGeneration): 1;
  index(phase: EventPhase.Registration): 2;
  index(phase: EventPhase.Round): 3;
  index(phase: EventPhase.Result): 4;
  index(phase: EventPhase.Finished): 5;
  index(phase: EventPhase): number;

  next(phase: EventPhase.Configuration): EventPhase.ScheduleGeneration;
  next(phase: EventPhase.ScheduleGeneration): EventPhase.Registration;
  next(phase: EventPhase.Registration): EventPhase.Round;
  next(phase: EventPhase.Round): EventPhase.Result;
  next(phase: EventPhase.Result): EventPhase.Finished;
  next(phase: Exclude<EventPhase, EventPhase.Finished>): Exclude<EventPhase, EventPhase.Configuration>;
}

@Injectable()
export class EventPhaseService implements EventPhaseService {
  public index(phase: EventPhase): number {
    switch (phase) {
      case EventPhase.Configuration:
        return 0;
      case EventPhase.ScheduleGeneration:
        return 1;
      case EventPhase.Registration:
        return 2;
      case EventPhase.Round:
        return 3;
      case EventPhase.Result:
        return 4;
      case EventPhase.Finished:
        return 5;
    }
  }

  public compare(first: EventPhase, second: EventPhase): ComparisonResult {
    if (this.index(first) < this.index(second)) {
      return ComparisonResult.LessThan;
    }
    if (this.index(first) > this.index(second)) {
      return ComparisonResult.GreaterThan;
    }
    return ComparisonResult.Equal;
  }

  public next(
    phase: Exclude<EventPhase, EventPhase.Finished>
  ): Exclude<EventPhase, EventPhase.Configuration> {
    switch (phase) {
      case EventPhase.Configuration:
        return EventPhase.ScheduleGeneration;
      case EventPhase.ScheduleGeneration:
        return EventPhase.Registration;
      case EventPhase.Registration:
        return EventPhase.Round;
      case EventPhase.Round:
        return EventPhase.Result;
      case EventPhase.Result:
        return EventPhase.Finished;
    }
  }
}
