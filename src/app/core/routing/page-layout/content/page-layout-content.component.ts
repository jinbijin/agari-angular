import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'main[agariPageLayout]',
  templateUrl: './page-layout-content.component.html',
  styleUrls: ['./page-layout-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutContentComponent {}
