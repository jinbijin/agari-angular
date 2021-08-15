import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routeWithLayout } from 'src/app/instrumentation/routing/route-with-layout';
import { AgariLayoutModule } from './agari-layout/agari-layout.module';
import { AGARI_ROUTES } from './agari.routes';
import { AgariLayoutComponent } from './agari-layout/agari-layout.component';

@NgModule({
  imports: [
    AgariLayoutModule,
    RouterModule.forRoot(routeWithLayout(AGARI_ROUTES, AgariLayoutComponent))
  ],
  exports: [
    RouterModule
  ]
})
export class AgariRoutingModule {}
