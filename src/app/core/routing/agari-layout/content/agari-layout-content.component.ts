import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'main[agariLayout]',
  templateUrl: './agari-layout-content.component.html',
  styleUrls: ['./agari-layout-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgariLayoutContentComponent {}
