import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'agari-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  constructor() {}
}
