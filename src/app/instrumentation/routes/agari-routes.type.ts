import { Route } from '@angular/router';

export interface AgariRouteExtension {
  label: string;
  id?: string;
  display: boolean;
  agariChildren?: AgariRoutes;
}

export type AgariRoute = Route & AgariRouteExtension;

export type AgariRoutes = AgariRoute[];
