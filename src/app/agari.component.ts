import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'agari-root',
  templateUrl: './agari.component.html',
  styleUrls: ['./agari.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgariComponent {}
