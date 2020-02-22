import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ScheduleRound } from 'src/app/graphql/generated/types';

@Component({
  selector: 'agari-schedule-generator-round',
  templateUrl: './schedule-generator-round.component.html',
  styleUrls: ['./schedule-generator-round.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorRoundComponent implements OnInit {
  @Input()
  public scheduleRound: ScheduleRound;

  @Input()
  public roundNumber: number;

  constructor() {}

  public ngOnInit(): void {}
}
