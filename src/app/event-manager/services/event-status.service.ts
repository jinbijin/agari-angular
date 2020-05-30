import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ComparisonResult } from 'src/app/instrumentation/enum/comparison-result.enum';
import { EventPhase } from 'src/app/instrumentation/types/event-status/event-phase.enum';
import {
  ConfigurationStatus,
  EventStatus,
  FinishedStatus,
} from 'src/app/instrumentation/types/event-status/event-status.type';
import { GlobalState } from 'src/app/instrumentation/types/global-state/global-state.type';

import { EventPhaseService } from './event-phase.service';

@Injectable()
export class EventStatusService {
  public constructor(private readonly store: Store, private readonly eventPhase: EventPhaseService) {}

  public compare(first: EventStatus, second: EventStatus): ComparisonResult {
    if (first.phase !== second.phase) {
      return this.eventPhase.compare(first.phase, second.phase);
    }
    if (first.phase === EventPhase.Round && second.phase === EventPhase.Round) {
      if (first.index < second.index) {
        return ComparisonResult.LessThan;
      }
      if (first.index > second.index) {
        return ComparisonResult.GreaterThan;
      }
    }
    return ComparisonResult.Equal;
  }

  public toString(status: EventStatus): string {
    if (status.phase !== EventPhase.Round) {
      return `${status.phase}`;
    }
    return `${status.phase} ${status.index + 1}`;
  }

  public next(status: Exclude<EventStatus, FinishedStatus>): Exclude<EventStatus, ConfigurationStatus> {
    switch (status.phase) {
      case EventPhase.Configuration:
        return { phase: EventPhase.ScheduleGeneration };
      case EventPhase.ScheduleGeneration:
        return { phase: EventPhase.Registration };
      case EventPhase.Registration:
        return { phase: EventPhase.Round, index: 0 };
      case EventPhase.Round:
        const roundCount = this.store.selectSnapshot((state: GlobalState) => state.eventConfiguration)
          .roundParticipantCount?.roundCount;
        if (!roundCount) {
          throw new Error('Cannot proceed past this status if no round count is set.');
        }
        if (status.index < roundCount - 1) {
          return { phase: EventPhase.Round, index: status.index + 1 };
        }
        return { phase: EventPhase.Result };
      case EventPhase.Result:
        return { phase: EventPhase.Finished };
    }
  }
}
