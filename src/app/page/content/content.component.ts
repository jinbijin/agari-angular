import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'agari-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
