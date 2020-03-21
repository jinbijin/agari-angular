import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SetParticipant } from 'src/app/event-manager/store/event-manager.actions';
import { EventManagerState } from 'src/app/event-manager/store/event-manager.state';
import { Participant } from 'src/app/instrumentation/types/participant.type';

import { ParticipantDialogComponent } from '../../dialogs/participant-dialog/participant-dialog.component';

@Component({
  selector: 'agari-event-registration-step',
  templateUrl: './event-registration-step.component.html',
  styleUrls: ['./event-registration-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventRegistrationStepComponent {
  constructor(private readonly dialog: MatDialog, private readonly store: Store) {}

  @Select(EventManagerState.participants)
  public readonly participants$: Observable<(Participant | undefined)[] | undefined>;

  public setParticipant(key: number, participant?: Participant): void {
    const dialogRef = this.dialog.open(ParticipantDialogComponent, { data: { participant, key } });
    dialogRef
      .afterClosed()
      .pipe(tap(value => this.store.dispatch(new SetParticipant({ participant: value, key }))))
      .subscribe();
  }

  public unsetParticipant(key: number): void {
    this.store.dispatch(new SetParticipant({ key }));
  }

  public trackEntryByKey(index: number, item: [number, Participant]): number {
    return item[0];
  }
}
