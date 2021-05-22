import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DevOnlyGuard implements CanLoad {
  public canLoad(route: Route, segments: UrlSegment[]): boolean {
    return !environment.production;
  }
}
