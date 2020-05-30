import { EventConfigurationStateModel } from 'src/app/event-manager/store/event-configuration/event-configuration.state-model';
import { EventScheduleStateModel } from 'src/app/event-manager/store/event-schedule/event-schedule.state-model';
import { EventStatusStateModel } from 'src/app/event-manager/store/event-status/event-status.state-model';

import { StateNames } from './state-names.type';

export interface GlobalState {
  [StateNames.eventStatusState]: EventStatusStateModel;
  [StateNames.eventConfigurationState]: EventConfigurationStateModel;
  [StateNames.eventScheduleState]: EventScheduleStateModel;
}
