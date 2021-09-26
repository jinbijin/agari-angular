import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RoundRobinSchedule } from 'src/app/instrumentation/types/schedule/round-robin-schedule.type';

@Component({
  selector: 'agari-round-grid',
  templateUrl: './round-grid.component.html',
  styleUrls: ['./round-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundGridComponent {
  @Input() schedule: RoundRobinSchedule;
}
