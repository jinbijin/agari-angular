import { Routes } from '@angular/router';

export const agariRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'schedule-generator',
    loadChildren: () =>
      import('./schedule-generator/schedule-generator.module').then(
        m => m.ScheduleGeneratorModule
      )
  }
];
