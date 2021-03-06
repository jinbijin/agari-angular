/* istanbul ignore file */

import { environment } from 'src/environments/environment';
import { AgariRoutes } from './instrumentation/routes/agari-routes.type';

export const agariRoutes: AgariRoutes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
    label: 'Agari',
    id: 'agari',
    display: false
  },
  {
    path: 'schedule-generator',
    loadChildren: () =>
      import('./schedule-generator/schedule-generator.module').then(m => m.ScheduleGeneratorModule),
    label: 'Schedule generator',
    id: 'scheduleGenerator',
    display: true
  },
  ...(environment.eventManager ? [{
    path: 'event-manager',
    loadChildren: () => import('./event-manager/event-manager.module').then(m => m.EventManagerModule),
    label: 'Event manager',
    id: 'eventManager',
    display: true
  }] : [])
];
