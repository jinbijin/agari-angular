import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RoundRobinSchedule } from 'src/app/instrumentation/types/schedule/round-robin-schedule.type';
import { EventManagerState } from '../../../store/event-manager.state';

@Component({
  templateUrl: './schedule-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDialogComponent {
  @Select(EventManagerState.schedule)
  public readonly schedule$: Observable<RoundRobinSchedule | undefined>;
}
