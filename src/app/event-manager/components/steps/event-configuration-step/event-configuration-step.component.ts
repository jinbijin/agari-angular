import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Schedule } from 'src/app/graphql/generated/types';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';

import {
  FinalizeConfiguration,
  GenerateSchedule,
  SetRoundParticipantCount,
  UnsetSchedule
} from '../../../store/event-manager.actions';
import { EventManagerState } from '../../../store/event-manager.state';
import { RoundParticipantDialogComponent } from '../../dialogs/round-participant-dialog/round-participant-dialog.component';
import { ScheduleDialogComponent } from '../../dialogs/schedule-dialog/schedule-dialog.component';

@Component({
  selector: 'agari-event-configuration-step',
  templateUrl: './event-configuration-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventConfigurationStepComponent {
  constructor(private readonly dialog: MatDialog, private readonly store: Store) {}

  @Select(EventManagerState.roundParticipantCount)
  public readonly roundParticipantCount$: Observable<RoundParticipantCount | undefined>;

  @Select(EventManagerState.roundParticipantFlag)
  public readonly roundParticipantSet$: Observable<boolean>;

  @Select(EventManagerState.schedule)
  public readonly schedule$: Observable<Schedule | undefined>;

  @Select(EventManagerState.configurationFlag)
  public readonly finalized$: Observable<boolean>;

  @Select(EventManagerState.registrationFlag)
  public readonly registrationFinalized$: Observable<boolean>;

  @Output() public readonly next: EventEmitter<void> = new EventEmitter();

  public setNumber(roundParticipantCount?: RoundParticipantCount): void {
    const dialogRef = this.dialog.open(RoundParticipantDialogComponent, { data: roundParticipantCount });
    this.setRoundParticipantCountOnClose(dialogRef);
  }

  public unsetNumber(): void {
    this.store.dispatch(new SetRoundParticipantCount(undefined));
  }

  public viewSchedule(): void {
    this.dialog.open(ScheduleDialogComponent);
  }

  public generateSchedule(): void {
    this.store.dispatch(new GenerateSchedule());
  }

  public unsetSchedule(): void {
    this.store.dispatch(new UnsetSchedule());
  }

  public goToNext(): void {
    this.next.emit();
  }

  public finalize(): void {
    this.store.dispatch(new FinalizeConfiguration());
    this.goToNext();
  }

  private setRoundParticipantCountOnClose(dialogRef: MatDialogRef<RoundParticipantDialogComponent>) {
    dialogRef
      .afterClosed()
      .pipe(
        filter(value => !!value),
        tap(value => this.store.dispatch(new SetRoundParticipantCount(value)))
      )
      .subscribe();
  }
}
