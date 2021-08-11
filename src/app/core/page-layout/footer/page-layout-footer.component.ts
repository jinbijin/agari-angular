import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'footer[agariPageLayout]',
  templateUrl: './page-layout-footer.component.html',
  styleUrls: ['./page-layout-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutFooterComponent {
  @Input() public version: string = environment.version;
}
