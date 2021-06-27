import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventManagerState } from 'src/app/event-manager/store/event-manager.state';
import { RoundRobinSchedule } from 'src/app/instrumentation/types/schedule/round-robin-schedule.type';

@Component({
  templateUrl: './schedule-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDialogComponent {
  @Select(EventManagerState.schedule)
  public readonly schedule$: Observable<RoundRobinSchedule | undefined>;
}
