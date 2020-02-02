import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './schedule-generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
