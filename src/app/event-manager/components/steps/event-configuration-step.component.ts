import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Schedule } from 'src/app/graphql/generated/types';

@Component({
  selector: 'agari-event-configuration-step',
  templateUrl: './event-configuration-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventConfigurationStepComponent {
  public roundParticipantCount: {
    roundCount: number;
    participantCount: number;
  };

  public roundParticipantSet: boolean;

  public schedule: Schedule;
}
