import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

const rootRoutes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule]
})
export class RootRoutingModule {}
