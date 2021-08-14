import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageLayoutModule } from './page-layout/page-layout.module';
import { AGARI_ROUTES } from './agari.routes';

@NgModule({
  imports: [
    PageLayoutModule,
    RouterModule.forRoot(AGARI_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AgariRoutingModule {}
