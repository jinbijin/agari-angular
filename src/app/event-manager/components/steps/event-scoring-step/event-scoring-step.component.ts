import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'agari-event-scoring-step',
  templateUrl: './event-scoring-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventScoringStepComponent {
  @Input() public index: number;
}
