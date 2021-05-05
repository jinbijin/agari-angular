import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageContentModule } from '../components/page-content/page-content.module';

import { SharedModule } from '../shared/shared.module';

import { landingRoutes } from './landing.routes';
import { LandingComponent } from './page/landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [SharedModule, RouterModule.forChild(landingRoutes), PageContentModule],
  exports: [],
  providers: []
})
export class LandingModule {}
