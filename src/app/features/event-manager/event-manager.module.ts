import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ErrorMessageModule } from '../../widgets/error-message/error-message.module';

import { SharedModule } from '../../shared/shared.module';

import { ParticipantDialogComponent } from './components/dialogs/participant-dialog/participant-dialog.component';
import { RoundParticipantDialogComponent } from './components/dialogs/round-participant-dialog/round-participant-dialog.component';
import { ScheduleDialogComponent } from './components/dialogs/schedule-dialog/schedule-dialog.component';
import { ScoringDialogComponent } from './components/dialogs/scoring-dialog/scoring-dialog.component';
import { EventManagerStepComponent } from './components/event-manager-step/event-manager-step.component';
import { EventManagerStepperComponent } from './components/event-manager-stepper/event-manager-stepper.component';
import { EventConfigurationStepComponent } from './components/steps/event-configuration-step/event-configuration-step.component';
import { EventFinalizationStepComponent } from './components/steps/event-finalization-step/event-finalization-step.component';
import { EventRegistrationStepComponent } from './components/steps/event-registration-step/event-registration-step.component';
import { EventScoringStepComponent } from './components/steps/event-scoring-step/event-scoring-step.component';
import { eventManagerRoutes } from './event-manager.routes';
import { EventManagerComponent } from './page/event-manager.component';
import { ScoreConverterService } from './services/score-converter.service';
import { EventManagerState } from './store/event-manager.state';

@NgModule({
  declarations: [
    EventManagerComponent,
    EventManagerStepperComponent,
    EventManagerStepComponent,
    EventConfigurationStepComponent,
    EventRegistrationStepComponent,
    EventScoringStepComponent,
    EventFinalizationStepComponent,
    RoundParticipantDialogComponent,
    ScheduleDialogComponent,
    ParticipantDialogComponent,
    ScoringDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(eventManagerRoutes),
    NgxsModule.forFeature([EventManagerState]),
    ErrorMessageModule,
  ],
  exports: [],
  providers: [ScoreConverterService]
})
export class EventManagerModule {}
