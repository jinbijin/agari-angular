import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ExcelExportModule } from '../excel-export/excel-export.module';

import { SharedModule } from '../shared/shared.module';

import { ScheduleGeneratorRequestComponent } from './components/schedule-generator-request/schedule-generator-request.component';
import { ScheduleGeneratorResponseComponent } from './components/schedule-generator-response/schedule-generator-response.component';
import { ScheduleGeneratorComponent } from './page/schedule-generator.component';
import { scheduleGeneratorRoutes } from './schedule-generator.routes';
import { ScheduleGeneratorState } from './store/schedule-generator.state';

@NgModule({
  declarations: [
    ScheduleGeneratorComponent,
    ScheduleGeneratorRequestComponent,
    ScheduleGeneratorResponseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(scheduleGeneratorRoutes),
    NgxsModule.forFeature([ScheduleGeneratorState]),
    ExcelExportModule,
  ],
  exports: [],
  providers: []
})
export class ScheduleGeneratorModule {}
