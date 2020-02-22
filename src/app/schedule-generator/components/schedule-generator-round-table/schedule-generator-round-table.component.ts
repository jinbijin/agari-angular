import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ScheduleGame, ScheduleRound } from 'src/app/graphql/generated/types';

@Component({
  selector: 'agari-schedule-generator-round-table',
  templateUrl: './schedule-generator-round-table.component.html',
  styleUrls: ['./schedule-generator-round-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorRoundTableComponent implements OnInit {
  @Input()
  public scheduleRound: ScheduleRound;

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
