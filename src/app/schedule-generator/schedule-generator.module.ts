import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { SharedModule } from '../shared/shared.module';

import { ScheduleGeneratorRequestComponent } from './components/schedule-generator-request/schedule-generator-request.component';
import { ScheduleGeneratorResponseComponent } from './components/schedule-generator-response/schedule-generator-response.component';
import { ScheduleGeneratorRoundTableComponent } from './components/schedule-generator-round-table/schedule-generator-round-table.component';
import { ScheduleGeneratorRoundComponent } from './components/schedule-generator-round/schedule-generator-round.component';
import { ScheduleGeneratorComponent } from './page/schedule-generator.component';
import { scheduleGeneratorRoutes } from './schedule-generator.routes';
import { ScheduleGeneratorState } from './store/schedule-generator.state';

@NgModule({
  declarations: [
    ScheduleGeneratorComponent,
    ScheduleGeneratorRequestComponent,
    ScheduleGeneratorResponseComponent,
    ScheduleGeneratorRoundComponent,
    ScheduleGeneratorRoundTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(scheduleGeneratorRoutes),
    NgxsModule.forFeature([ScheduleGeneratorState])
  ],
  exports: [],
  providers: []
})
export class ScheduleGeneratorModule {}
