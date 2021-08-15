import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routeWithLayout } from 'src/app/instrumentation/routing/route-with-layout';
import { PageLayoutComponent } from 'src/app/widgets/shared/layout/page-layout/page-layout.component';
import { SharedModule } from 'src/app/widgets/shared/shared.module';
import { LandingComponent } from './landing.component';
import { LANDING_ROUTES } from './landing.routes';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routeWithLayout(LANDING_ROUTES, PageLayoutComponent)),
  ]
})
export class LandingModule {}
