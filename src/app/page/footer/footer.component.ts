import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'footer[agariFooter]',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  @Input() public version: string = environment.version;

  public constructor() {}
}
