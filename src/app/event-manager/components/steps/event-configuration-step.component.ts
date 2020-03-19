import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Schedule } from 'src/app/graphql/generated/types';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';

import { RoundParticipantDialogComponent } from '../dialogs/round-participant-dialog.component';

@Component({
  selector: 'agari-event-configuration-step',
  templateUrl: './event-configuration-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventConfigurationStepComponent {
  constructor(private readonly dialog: MatDialog) {}

  private readonly roundParticipantCountSubject: Subject<RoundParticipantCount> = new Subject<
    RoundParticipantCount
  >();
  public readonly roundParticipantCount$: Observable<
    RoundParticipantCount
  > = this.roundParticipantCountSubject.asObservable();

  private readonly roundParticipantSetSubject: Subject<boolean> = new Subject<boolean>();
  public readonly roundParticipantSet$: Observable<boolean> = this.roundParticipantSetSubject.asObservable();

  public schedule: Schedule;

  public setNumber(roundParticipantCount?: RoundParticipantCount): void {
    const dialogRef = this.dialog.open(RoundParticipantDialogComponent, { data: roundParticipantCount });
    this.setRoundParticipantCountOnClose(dialogRef);
  }

  public unsetNumber(): void {
    this.roundParticipantCountSubject.next(undefined);
  }

  private setRoundParticipantCountOnClose(dialogRef: MatDialogRef<RoundParticipantDialogComponent>) {
    dialogRef
      .afterClosed()
      .pipe(
        filter(value => !!value),
        tap(value => this.roundParticipantCountSubject.next(value)),
        tap(value => this.roundParticipantSetSubject.next(true))
      )
      .subscribe();
  }
}
