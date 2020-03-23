import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FinalizeEvent } from 'src/app/event-manager/store/event-manager.actions';
import { EventManagerState } from 'src/app/event-manager/store/event-manager.state';

@Component({
  selector: 'agari-event-finalization-step',
  templateUrl: './event-finalization-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFinalizationStepComponent {
  constructor(private readonly store: Store) {}

  @Output() public previous: EventEmitter<void> = new EventEmitter();

  @Select(EventManagerState.eventFlag)
  public readonly finalized$: Observable<boolean>;

  public goToPrevious(): void {
    this.previous.emit();
  }

  public finalize(): void {
    this.store.dispatch(new FinalizeEvent());
  }
}
