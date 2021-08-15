import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routeWithLayout } from 'src/app/instrumentation/routing/route-with-layout';
import { PageLayoutComponent } from 'src/app/widgets/shared/layout/page-layout/page-layout.component';
import { SharedModule } from 'src/app/widgets/shared/shared.module';
import { ScheduleGeneratorComponent } from './schedule-generator.component';
import { SCHEDULE_GENERATOR_ROUTES } from './schedule-generator.routes';

@NgModule({
  declarations: [ScheduleGeneratorComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routeWithLayout(SCHEDULE_GENERATOR_ROUTES, PageLayoutComponent)),
  ]
})
export class ScheduleGeneratorModule {}
