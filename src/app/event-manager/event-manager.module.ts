import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { SharedModule } from '../shared/shared.module';

import { RoundParticipantDialogComponent } from './components/dialogs/round-participant-dialog/round-participant-dialog.component';
import { ScheduleDialogComponent } from './components/dialogs/schedule-dialog/schedule-dialog.component';
import { EventManagerStepComponent } from './components/event-manager-step/event-manager-step.component';
import { EventManagerStepperComponent } from './components/event-manager-stepper/event-manager-stepper.component';
import { EventConfigurationStepComponent } from './components/steps/event-configuration-step/event-configuration-step.component';
import { EventRegistrationStepComponent } from './components/steps/event-registration-step/event-registration-step.component';
import { eventManagerRoutes } from './event-manager.routes';
import { EventManagerComponent } from './page/event-manager.component';
import { EventManagerState } from './store/event-manager.state';

@NgModule({
  declarations: [
    EventManagerComponent,
    EventManagerStepperComponent,
    EventManagerStepComponent,
    EventConfigurationStepComponent,
    EventRegistrationStepComponent,
    RoundParticipantDialogComponent,
    ScheduleDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(eventManagerRoutes),
    NgxsModule.forFeature([EventManagerState])
  ],
  exports: [],
  providers: []
})
export class EventManagerModule {}
