import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { EventManagerStepperComponent } from './components/event-manager-stepper/event-manager-stepper.component';
import { eventManagerRoutes } from './event-manager.routes';
import { EventManagerComponent } from './page/event-manager.component';

@NgModule({
  declarations: [EventManagerComponent, EventManagerStepperComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(eventManagerRoutes)],
  exports: [],
  providers: []
})
export class EventManagerModule {}
