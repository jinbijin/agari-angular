import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Status } from 'src/app/instrumentation/enum/status.enum';
import { ExcelExportConfiguration } from 'src/app/widgets/excel-export/excel-export-configuration.type';

import { RoundRobinSchedule } from 'src/app/instrumentation/types/schedule/round-robin-schedule.type';
import { ErrorData } from 'src/app/instrumentation/types/response/error-data.type';
import { Response } from 'src/app/instrumentation/types/response/response.type';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';
import { ScheduleGeneratorState } from '../../store/schedule-generator.state';

@Component({
  selector: 'agari-schedule-generator-response',
  templateUrl: './schedule-generator-response.component.html',
  styleUrls: ['./schedule-generator-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorResponseComponent implements OnInit {
  @Select(ScheduleGeneratorState.status)
  public status$: Observable<Status>;

  @Select(ScheduleGeneratorState.payload)
  public payload$: Observable<RoundParticipantCount | null>;

  @Select(ScheduleGeneratorState.response)
  public response$: Observable<Response<RoundRobinSchedule, ErrorData> | null>;

  public export$: Observable<ExcelExportConfiguration | undefined>;

  public constructor() {}

  public ngOnInit(): void {
    this.export$ = this.response$.pipe(
      map(response =>
        response && response.data
          ? {
              data: response.data.rounds.map(r => r.games.flatMap(g => g.participantNrs)),
              filename: [
                'schedule',
                response.data.rounds.length,
                response.data.rounds[0].games.length,
                new Date().toISOString()
              ].join('_'),
              sheetname: 'Schedule'
            }
          : undefined
      )
    );
  }
}
