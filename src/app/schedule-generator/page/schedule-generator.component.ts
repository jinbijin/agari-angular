import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './schedule-generator.component.html',
  styleUrls: ['./schedule-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorComponent {
  public constructor() {}
}
