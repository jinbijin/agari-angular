import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventManagerState } from 'src/app/event-manager/store/event-manager.state';
import { Schedule } from 'src/app/graphql/generated/types';

@Component({
  templateUrl: './schedule-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDialogComponent {
  @Select(EventManagerState.schedule)
  public readonly schedule$: Observable<Schedule | undefined>;
}
