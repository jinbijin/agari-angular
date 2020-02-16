import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Store } from '@ngxs/store';

import { GenerateSchedule } from '../../store/schedule-generator.action';

@Component({
  selector: 'agari-schedule-generator-request',
  templateUrl: './schedule-generator-request.component.html',
  styleUrls: ['./schedule-generator-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorRequestComponent implements OnInit {
  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store
  ) {
    this.formGroup = this.builder.group({
      roundCount: [undefined, [Validators.required, Validators.min(1)]],
      participantCount: [
        undefined,
        [
          Validators.required,
          Validators.min(1),
          ScheduleGeneratorRequestComponent.modValidator(4, 0)
        ]
      ]
    });
  }

  public formGroup: FormGroup;

  public get roundCount(): FormControl {
    return this.formGroup.controls.roundCount as FormControl;
  }

  public get participantCount(): FormControl {
    return this.formGroup.controls.participantCount as FormControl;
  }

  private static modValidator(modulus: number, remainder: number): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value % modulus === remainder
        ? null
        : { mod: { modulus, remainder } };
    };
  }

  public ngOnInit(): void {}

  public onSubmit(): void {
    this.store
      .dispatch(
        new GenerateSchedule({
          roundCount: this.roundCount.value,
          participantCount: this.participantCount.value
        })
      )
      .subscribe();
  }
}
