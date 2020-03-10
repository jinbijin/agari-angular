import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'agari-event-manager-stepper',
  templateUrl: './event-manager-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventManagerStepperComponent implements OnInit {
  public ngOnInit(): void {}
}
