import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'agari-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public brand: string = 'アガリ';

  constructor() {}

  public ngOnInit(): void {}
}
