import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { landingRoutes } from './landing.routes';
import { LandingComponent } from './page/landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [SharedModule, RouterModule.forChild(landingRoutes)],
  exports: [],
  providers: []
})
export class LandingModule {}
