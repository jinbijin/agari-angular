import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { routeWithLayout } from 'src/app/instrumentation/routing/route-with-layout';
import { RoundRobinInputModule } from 'src/app/widgets/round-robin-input/round-robin-input.module';
import { PageLayoutComponent } from 'src/app/widgets/shared/layout/page-layout/page-layout.component';
import { SharedModule } from 'src/app/widgets/shared/shared.module';
import { ScheduleGeneratorComponent } from './schedule-generator.component';
import { SCHEDULE_GENERATOR_ROUTES } from './schedule-generator.routes';
import { ScheduleGeneratorStoreModule } from './store/schedule-generator-store.module';

@NgModule({
  declarations: [ScheduleGeneratorComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routeWithLayout(SCHEDULE_GENERATOR_ROUTES, PageLayoutComponent)),
    MatButtonModule,
    MatCardModule,
    RoundRobinInputModule,
    ScheduleGeneratorStoreModule,
  ]
})
export class ScheduleGeneratorModule {}
