import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventManagerState } from 'src/app/event-manager/store/event-manager.state';
import { Participant } from 'src/app/instrumentation/types/participant.type';

@Component({
  selector: 'agari-event-registration-step',
  templateUrl: './event-registration-step.component.html',
  styleUrls: ['./event-registration-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventRegistrationStepComponent {
  @Select(EventManagerState.participants)
  public readonly participants$: Observable<(Participant | undefined)[] | undefined>;
}
