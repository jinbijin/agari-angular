import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './landing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
