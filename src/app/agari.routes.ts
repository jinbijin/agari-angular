/* istanbul ignore file */

import { DevOnlyGuard } from './core/guards/dev-only.guard';
import { AgariRoutes } from './instrumentation/routes/agari-routes.type';

export const agariRoutes: AgariRoutes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),
    label: 'Agari',
    id: 'agari',
    display: false,
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
    canLoad: [DevOnlyGuard],
    label: 'Demo',
    id: 'demo',
    display: false,
  },
  {
    path: 'event-manager',
    loadChildren: () => import('./event-manager/event-manager.module').then((m) => m.EventManagerModule),
    label: 'Event manager',
    id: 'eventManager',
    display: true,
  },
  {
    path: 'schedule-generator',
    loadChildren: () =>
      import('./schedule-generator/schedule-generator.module').then((m) => m.ScheduleGeneratorModule),
    label: 'Schedule generator',
    id: 'scheduleGenerator',
    display: true,
  },
];
