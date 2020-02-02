import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'agari-root',
  templateUrl: './agari.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgariComponent {}
