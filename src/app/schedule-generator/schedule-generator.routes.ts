import { AgariRoutes } from '../instrumentation/routes/agari-routes.type';

import { ScheduleGeneratorComponent } from './page/schedule-generator.component';

export const scheduleGeneratorRoutes: AgariRoutes = [
  {
    path: '',
    component: ScheduleGeneratorComponent,
    label: 'Schedule generator',
    display: true
  }
];
