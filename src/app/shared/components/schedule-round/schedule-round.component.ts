import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RoundRobinRound } from 'src/app/instrumentation/types/schedule/round-robin-round.type';

@Component({
  selector: 'agari-schedule-round',
  templateUrl: './schedule-round.component.html',
  styleUrls: ['./schedule-round.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleRoundComponent {
  @Input()
  public scheduleRound: RoundRobinRound;

  @Input()
  public roundNumber: number;

  public constructor() {}
}
