import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'agari-content',
  templateUrl: './content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
