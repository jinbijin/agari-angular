import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScheduleGeneratorComponent } from './page/schedule-generator.component';
import { scheduleGeneratorRoutes } from './schedule-generator.routes';

@NgModule({
  declarations: [ScheduleGeneratorComponent],
  imports: [CommonModule, RouterModule.forChild(scheduleGeneratorRoutes)],
  exports: [],
  providers: []
})
export class ScheduleGeneratorModule {}
