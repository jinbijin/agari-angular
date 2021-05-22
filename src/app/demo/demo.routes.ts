import { Routes } from '@angular/router';
import { DemoComponent } from './demo.component';

export const DEMO_ROUTES: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {
        path: 'button',
        loadChildren: () => import('./button/button.module').then((m) => m.DemoButtonModule),
      },
    ],
  },
];
