import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { landingRoutes } from './landing.routes';
import { LandingComponent } from './page/landing.component';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, RouterModule.forChild(landingRoutes)],
  exports: [],
  providers: []
})
export class LandingModule {}
