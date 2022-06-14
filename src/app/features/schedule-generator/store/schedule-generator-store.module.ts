import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ScheduleGeneratorApiService } from './schedule-generator-api.service';
import { ScheduleGeneratorState } from './schedule-generator.state';

@NgModule({
  imports: [NgxsModule.forFeature([ScheduleGeneratorState])],
  exports: [NgxsModule],
  providers: [ScheduleGeneratorApiService]
})
export class ScheduleGeneratorStoreModule {}
