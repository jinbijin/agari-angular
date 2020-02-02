import { AgariRoutes } from '../instrumentation/routes/agari-routes.type';

import { LandingComponent } from './page/landing.component';

export const landingRoutes: AgariRoutes = [
  { path: '', component: LandingComponent, label: 'Agari', display: true }
];
