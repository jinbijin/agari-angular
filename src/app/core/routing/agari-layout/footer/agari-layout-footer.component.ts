import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'footer[agariLayout]',
  templateUrl: './agari-layout-footer.component.html',
  styleUrls: ['./agari-layout-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgariLayoutFooterComponent {
  @Input() public version: string = environment.version;
}
