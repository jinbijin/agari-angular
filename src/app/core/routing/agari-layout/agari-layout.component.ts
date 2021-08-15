import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'agari-page-layout',
  templateUrl: './agari-layout.component.html',
  styleUrls: ['./agari-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgariLayoutComponent {}
