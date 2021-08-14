import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[agariPageLayout]',
  templateUrl: './page-layout-header.component.html',
  styleUrls: ['./page-layout-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutHeaderComponent {
  public readonly brand: string = 'アガリ';

  public displayedRoutes = [{
    path: 'schedule-generator', label: 'Schedule generator'
  }];
}

