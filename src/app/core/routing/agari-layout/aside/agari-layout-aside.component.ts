import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'aside[agariLayout]',
  templateUrl: './agari-layout-aside.component.html',
  styleUrls: ['./agari-layout-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgariLayoutAsideComponent {}
