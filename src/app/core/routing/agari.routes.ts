import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

export const AGARI_ROUTES: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('src/app/landing/landing.module')).LandingModule,
  },
  {
    path: 'schedule-generator',
    loadChildren: async () =>
      (await import('src/app/schedule-generator/schedule-generator.module')).ScheduleGeneratorModule,
  },
  ...(environment.eventManager ? [{
    path: 'event-manager',
    loadChildren: async () => (await import('src/app/event-manager/event-manager.module')).EventManagerModule,
  }] : [])
];
