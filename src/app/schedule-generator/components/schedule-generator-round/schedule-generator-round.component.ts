import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ScheduleGame, ScheduleRound } from 'src/app/graphql/generated/types';

@Component({
  selector: 'agari-schedule-generator-round-card',
  templateUrl: './schedule-generator-round.component.html',
  styleUrls: ['./schedule-generator-round.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorRoundComponent implements OnInit {
  @Input()
  public scheduleRound: ScheduleRound;

  @Input()
  public roundNumber: number;

  public dataSource: [number, ScheduleGame][];

  public displayedColumns: string[] = [
    'table',
    'tableNumber',
    'participant1',
    'participant2',
    'participant3',
    'participant4'
  ];

  constructor() {}

  public ngOnInit(): void {
    this.dataSource = [...this.scheduleRound.games.entries()];
  }
}
