import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { routeWithLayout } from 'src/app/instrumentation/routing/route-with-layout';
import { ExcelExportModule } from 'src/app/widgets/excel-export/excel-export.module';
import { RoundRobinInputModule } from 'src/app/widgets/round-robin-input/round-robin-input.module';
import { RoundRobinRoundModule } from 'src/app/widgets/round-robin-round/round-robin-round.module';
import { PageLayoutComponent } from 'src/app/widgets/shared/layout/page-layout/page-layout.component';
import { SharedModule } from 'src/app/widgets/shared/shared.module';
import { RoundGridComponent } from './round-grid/round-grid.component';
import { ScheduleGeneratorComponent } from './schedule-generator.component';
import { SCHEDULE_GENERATOR_ROUTES } from './schedule-generator.routes';
import { ScheduleGeneratorStoreModule } from './store/schedule-generator-store.module';

@NgModule({
  declarations: [ScheduleGeneratorComponent, RoundGridComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routeWithLayout(SCHEDULE_GENERATOR_ROUTES, PageLayoutComponent)),
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    ExcelExportModule,
    RoundRobinInputModule,
    RoundRobinRoundModule,
    ScheduleGeneratorStoreModule,
  ]
})
export class ScheduleGeneratorModule {}
