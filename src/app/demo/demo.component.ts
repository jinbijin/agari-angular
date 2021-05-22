import { Component, HostBinding } from '@angular/core';

@Component({
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  @HostBinding('attr.data-cy') public dataTestId = 'demo-host';
}
