import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'agari-event-manager-stepper',
  templateUrl: './event-manager-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventManagerStepperComponent implements OnInit {
  public form: FormGroup & {
    controls: {
      config: FormControl;
      registration: FormControl;
    };
  };

  public configFinalized: boolean;
  public registrationFinalized: boolean;

  public ngOnInit(): void {
    this.form = new FormGroup({
      config: new FormControl(undefined),
      registration: new FormControl(undefined)
    }) as any;
  }

  public clickFinalizeConfig() {
    this.configFinalized = true;
  }

  public clickFinalizeRegistration() {
    this.registrationFinalized = true;
  }
}
