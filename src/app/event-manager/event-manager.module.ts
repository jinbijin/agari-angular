import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { RoundParticipantDialogComponent } from './components/dialogs/round-participant-dialog.component';
import { EventManagerStepComponent } from './components/event-manager-step/event-manager-step.component';
import { EventManagerStepperComponent } from './components/event-manager-stepper/event-manager-stepper.component';
import { EventConfigurationStepComponent } from './components/steps/event-configuration-step.component';
import { eventManagerRoutes } from './event-manager.routes';
import { EventManagerComponent } from './page/event-manager.component';

@NgModule({
  declarations: [
    EventManagerComponent,
    EventManagerStepperComponent,
    EventManagerStepComponent,
    EventConfigurationStepComponent,
    RoundParticipantDialogComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(eventManagerRoutes)],
  exports: [],
  providers: []
})
export class EventManagerModule {}
