import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ScheduleGeneratorComponent } from './page/schedule-generator.component';
import { scheduleGeneratorRoutes } from './schedule-generator.routes';

@NgModule({
  declarations: [ScheduleGeneratorComponent],
  imports: [SharedModule, RouterModule.forChild(scheduleGeneratorRoutes)],
  exports: [],
  providers: []
})
export class ScheduleGeneratorModule {}
