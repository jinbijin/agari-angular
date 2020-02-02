import { Routes } from '@angular/router';

export const agariRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing/landing.module').then(m => m.LandingModule)
  }
];
