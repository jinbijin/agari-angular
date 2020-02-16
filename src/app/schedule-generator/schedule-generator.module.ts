import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ScheduleGeneratorRequestComponent } from './component/schedule-generator-request/schedule-generator-request.component';
import { ScheduleGeneratorComponent } from './page/schedule-generator.component';
import { scheduleGeneratorRoutes } from './schedule-generator.routes';

@NgModule({
  declarations: [ScheduleGeneratorComponent, ScheduleGeneratorRequestComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(scheduleGeneratorRoutes)
  ],
  exports: [],
  providers: []
})
export class ScheduleGeneratorModule {}
