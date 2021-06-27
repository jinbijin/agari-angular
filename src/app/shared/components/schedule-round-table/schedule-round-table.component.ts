import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableConfiguration } from 'src/app/instrumentation/data/table-configuration.type';
import { Transforms } from 'src/app/instrumentation/transforms/transforms';
import { RoundRobinGame } from 'src/app/instrumentation/types/schedule/round-robin-game.type';
import { RoundRobinRound } from 'src/app/instrumentation/types/schedule/round-robin-round.type';

@Component({
  selector: 'agari-schedule-round-table',
  templateUrl: './schedule-round-table.component.html',
  styleUrls: ['./schedule-round-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleRoundTableComponent implements OnInit {
  @Input()
  public scheduleRound: RoundRobinRound;

  public dataSource: [number, RoundRobinGame][];

  public displayedColumns: string[] = [
    'table',
    'tableNumber',
    'participant1',
    'participant2',
    'participant3',
    'participant4'
  ];

  public tableConfiguration: TableConfiguration<[number, RoundRobinGame]>;

  public constructor() {}

  public ngOnInit(): void {
    this.dataSource = [...this.scheduleRound.games.entries()];
    this.tableConfiguration = {
      dataSource: new MatTableDataSource<[number, RoundRobinGame]>(this.dataSource),
      headers: false,
      columns: [
        { id: 'table', cell: element => 'Table', classes: ['agari-cell-text'] },
        {
          id: 'tableNumber',
          cell: element => Transforms.asOrdinal(element[0]),
          classes: ['agari-cell-numeric', 'agari-cell-right-gap']
        },
        ...[0, 1, 2, 3].map(i => ({
          id: 'participant' + i,
          cell: (element: [number, RoundRobinGame]) => Transforms.asOrdinal(element[1].participantNrs[i]),
          classes: ['agari-cell-numeric', ...(i === 3 ? ['agari-cell-right-gap'] : [])]
        }))
      ]
    };
  }
}
