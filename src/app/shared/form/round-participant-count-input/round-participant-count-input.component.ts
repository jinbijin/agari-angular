import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EmptyBase } from 'src/app/instrumentation/mixins/base-class/empty-base';
import { Mixin } from 'src/app/instrumentation/mixins/mixin';

import { RoundParticipantValueAccessor } from './mixins/round-participant-value-accessor.mixin';

@Component({
  selector: 'agari-round-participant-count-input',
  templateUrl: './round-participant-count-input.component.html',
  styleUrls: ['./round-participant-count-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RoundParticipantCountInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RoundParticipantCountInputComponent),
      multi: true
    }
  ]
})
export class RoundParticipantCountInputComponent
  extends RoundParticipantValueAccessor(Mixin.Reactive(EmptyBase))
  implements OnInit, ControlValueAccessor, Validator {
  constructor() {
    super();
    this.subscription.add(
      this.controls.roundCount.valueChanges
        .pipe(
          tap(value => this.controls.participantCount.updateValueAndValidity())
        )
        .subscribe()
    );
    this.subscription.add(
      combineLatest([
        this.controls.roundCount.valueChanges,
        this.controls.participantCount.valueChanges
      ])
        .pipe(
          map(value => ({
            roundCount: value[0] ? +value[0] : value[0],
            participantCount: value[1] ? +value[1] : value[1]
          })),
          tap(value => this.onChange(value))
        )
        .subscribe()
    );
  }

  public ngOnInit(): void {}

  public roundCountErrorMessage(errors: any): string | null {
    if (errors?.required) {
      return 'This field is required.';
    } else if (errors?.min) {
      return 'Number of rounds must be greater than 0.';
    } else {
      return null;
    }
  }

  public participantCountErrorMessage(errors: any): string | null {
    if (errors?.required) {
      return 'This field is required.';
    } else if (errors?.min) {
      return 'Number of participants must be greater than 0.';
    } else if (errors?.mod) {
      return 'Number of participants must be divisible by 4.';
    } else if (errors?.minParticipant) {
      return `Number of participants must be at least ${errors?.minParticipant.min}`;
    } else {
      return null;
    }
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid ? null : { roundParticipantCount: {} };
  }
}
