import { Injectable } from '@angular/core';
import { ComparisonResult } from 'src/app/instrumentation/enum/comparison-result.enum';
import { EventPhase, EventStatus } from 'src/app/instrumentation/types/event-status/event-status.type';

@Injectable()
export class EventStatusService {
  public compare(first: EventStatus, second: EventStatus): ComparisonResult {
    if (first.phase < second.phase) {
      return ComparisonResult.LessThan;
    }
    if (first.phase > second.phase) {
      return ComparisonResult.GreaterThan;
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
}
