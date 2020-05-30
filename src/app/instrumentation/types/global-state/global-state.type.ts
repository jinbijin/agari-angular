import { EventConfigurationStateModel } from 'src/app/event-manager/store/event-configuration/event-configuration.state-model';
import { EventRegistrationStateModel } from 'src/app/event-manager/store/event-registration/event-registration.state-model';
import { EventRoundStateModel } from 'src/app/event-manager/store/event-round/event-round.state-model';
import { EventScheduleStateModel } from 'src/app/event-manager/store/event-schedule/event-schedule.state-model';
import { EventStatusStateModel } from 'src/app/event-manager/store/event-status/event-status.state-model';

import { StateNames } from './state-names.type';

export interface GlobalState {
  [StateNames.eventStatusState]: EventStatusStateModel;
  [StateNames.eventConfigurationState]: EventConfigurationStateModel;
  [StateNames.eventScheduleState]: EventScheduleStateModel;
  [StateNames.eventRegistrationState]: EventRegistrationStateModel;
  [StateNames.eventRoundState]: EventRoundStateModel;
}
