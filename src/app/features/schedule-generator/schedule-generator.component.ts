import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './schedule-generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleGeneratorComponent {
  onSubmit(value: any): void {
    console.log(value);
  }
}
