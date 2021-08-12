import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageLayoutComponent } from './page-layout/page-layout.component';

export const ROOT_ROUTES: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/landing/landing.module').then(m => m.LandingModule),
      },
      {
        path: 'schedule-generator',
        loadChildren: () =>
          import('src/app/schedule-generator/schedule-generator.module').then(m => m.ScheduleGeneratorModule),
      },
      ...(environment.eventManager ? [{
        path: 'event-manager',
        loadChildren: () => import('src/app/event-manager/event-manager.module').then(m => m.EventManagerModule),
      }] : [])
    ]
  }
];
