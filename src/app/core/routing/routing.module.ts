import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageLayoutModule } from './page-layout/page-layout.module';
import { AGARI_ROUTES } from './agari.routes';
import { routeWithLayout } from './route-with-layout';
import { PageLayoutComponent } from './page-layout/page-layout.component';

@NgModule({
  imports: [
    PageLayoutModule,
    RouterModule.forRoot(routeWithLayout(AGARI_ROUTES, PageLayoutComponent))
  ],
  exports: [
    RouterModule
  ]
})
export class AgariRoutingModule {}
