import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { UpdateNotificationService } from './update-notification.service';

@NgModule({
  imports: [
    MatSnackBarModule,
    ServiceWorkerModule,
  ],
  exports: [
    ServiceWorkerModule
  ]
})
export class PwaModule {
  public static forRoot(): Required<ModuleWithProviders<PwaModule>> {
    return {
      ngModule: PwaModule,
      providers: [
        UpdateNotificationService,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }).providers!,
      ]
    }
  }
}
