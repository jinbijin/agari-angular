import { Type } from '@angular/core';
import { Routes } from '@angular/router';

export const routeWithLayout: (routes: Routes, component: Type<any>) => Routes = (routes: Routes, component: Type<any>) => [
  { path: '', component, children: routes }
]
