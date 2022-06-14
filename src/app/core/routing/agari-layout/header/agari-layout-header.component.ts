import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AGARI_ROUTES } from '../../agari.routes';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[agariLayout]',
  templateUrl: './agari-layout-header.component.html',
  styleUrls: ['./agari-layout-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgariLayoutHeaderComponent {
  public readonly brand: string = 'アガリ';

  public displayedRoutes = AGARI_ROUTES.filter(route => route.data?.inMenu).map(route => ({ path: route.path, label: route.data?.title }));
}

