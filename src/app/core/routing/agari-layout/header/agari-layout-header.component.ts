import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[agariLayout]',
  templateUrl: './agari-layout-header.component.html',
  styleUrls: ['./agari-layout-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgariLayoutHeaderComponent {
  public readonly brand: string = 'アガリ';

  public displayedRoutes = [{
    path: 'schedule-generator', label: 'Schedule generator'
  }];
}

