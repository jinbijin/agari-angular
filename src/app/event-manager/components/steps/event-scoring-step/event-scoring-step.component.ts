import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RoundResult } from 'src/app/instrumentation/types/round-result.type';

@Component({
  selector: 'agari-event-scoring-step',
  templateUrl: './event-scoring-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventScoringStepComponent {
  @Input() public index: number;
}
