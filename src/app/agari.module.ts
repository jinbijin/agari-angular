import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { environment } from '../environments/environment';

import { AgariComponent } from './agari.component';
import { agariRoutes } from './agari.routes';
import { CoreModule } from './core/core.module';
import { UpdateNotificationService } from './core/services/update-notification.service';
import { PageModule } from './page/page.module';

@NgModule({
  declarations: [AgariComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(agariRoutes, { relativeLinkResolution: 'legacy' }),
    CoreModule,
    HttpClientModule,
    MatSnackBarModule,
    PageModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [UpdateNotificationService],
  bootstrap: [AgariComponent]
})
export class AgariModule {}
