import { AgariRoutes } from '../../instrumentation/routes/agari-routes.type';

import { EventManagerComponent } from './page/event-manager.component';

export const eventManagerRoutes: AgariRoutes = [
  {
    path: '',
    component: EventManagerComponent,
    label: 'Event manager',
    display: true
  }
];
