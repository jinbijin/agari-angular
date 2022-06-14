import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

export const AGARI_ROUTES: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('src/app/features/landing/landing.module')).LandingModule,
    data: { title: 'Welcome to Agari!', inMenu: false }
  },
  {
    path: 'schedule-generator',
    loadChildren: async () =>
      (await import('src/app/features/schedule-generator/schedule-generator.module')).ScheduleGeneratorModule,
    data: { title: 'Schedule generator', inMenu: true }
  },
  ...(environment.eventManager ? [{
    path: 'event-manager',
    loadChildren: async () => (await import('src/app/features/event-manager/event-manager.module')).EventManagerModule,
    data: { title: 'Event manager', inMenu: true }
  }] : [])
];
