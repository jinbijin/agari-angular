import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EmptyBase } from 'src/app/instrumentation/mixins/base-class/empty-base';
import { Mixin } from 'src/app/instrumentation/mixins/mixin';
import { Participant } from 'src/app/instrumentation/types/participant.type';

import { FinalizeRegistration, SetParticipant } from '../../../store/event-manager.actions';
import { EventManagerState } from '../../../store/event-manager.state';
import { ParticipantDialogComponent } from '../../dialogs/participant-dialog/participant-dialog.component';

@Component({
  selector: 'agari-event-registration-step',
  templateUrl: './event-registration-step.component.html',
  styleUrls: ['./event-registration-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventRegistrationStepComponent extends Mixin.TrackByIndex(EmptyBase) {
  @Select(EventManagerState.participants)
  public readonly participants$: Observable<(Participant | undefined)[] | undefined>;

  @Select(EventManagerState.registrationFlag)
  public readonly finalized$: Observable<boolean>;

  @Select(EventManagerState.registrationReady)
  public readonly ready$: Observable<boolean>;

  @Select(EventManagerState.eventFlag)
  public readonly eventFinalized$: Observable<boolean>;

  @Output() public readonly previous: EventEmitter<void> = new EventEmitter();
  @Output() public readonly next: EventEmitter<void> = new EventEmitter();

  public constructor(private readonly dialog: MatDialog, private readonly store: Store) {
    super();
  }

  public setParticipant(index: number, participant?: Participant): void {
    const dialogRef = this.dialog.open(ParticipantDialogComponent, { data: { participant, index } });
    dialogRef
      .afterClosed()
      .pipe(tap(value => this.store.dispatch(new SetParticipant({ participant: value, index }))))
      .subscribe();
  }

  public unsetParticipant(index: number): void {
    this.store.dispatch(new SetParticipant({ index }));
  }

  public goToPrevious(): void {
    this.previous.emit();
  }

  public goToNext(): void {
    this.next.emit();
  }

  public finalize(): void {
    this.store.dispatch(new FinalizeRegistration());
    this.goToNext();
  }
}
