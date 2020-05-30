import { Injectable } from '@angular/core';
import { ComparisonResult } from 'src/app/instrumentation/enum/comparison-result.enum';
import { EventPhase } from 'src/app/instrumentation/types/event-status/event-phase.enum';
import { EventStatus } from 'src/app/instrumentation/types/event-status/event-status.type';

import { EventPhaseService } from './event-phase.service';

@Injectable()
export class EventStatusService {
  public constructor(private readonly eventPhase: EventPhaseService) {}

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
}
