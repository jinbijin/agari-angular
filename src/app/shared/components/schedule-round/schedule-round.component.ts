import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ScheduleRound } from 'src/app/graphql/generated/types';

@Component({
  selector: 'agari-schedule-round',
  templateUrl: './schedule-round.component.html',
  styleUrls: ['./schedule-round.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleRoundComponent {
  @Input()
  public scheduleRound: ScheduleRound;

  @Input()
  public roundNumber: number;

  public constructor() {}
}
