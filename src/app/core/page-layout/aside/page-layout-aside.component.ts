import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'aside[agariPageLayout]',
  templateUrl: './page-layout-aside.component.html',
  styleUrls: ['./page-layout-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutAsideComponent {}
