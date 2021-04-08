import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'agari-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  @Input() public version: string = environment.version;

  public constructor() {}
}
