import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { ScheduleGeneratorService } from 'src/app/core/services/schedule-generator.service';
import { EmptyBase } from 'src/app/instrumentation/mixins/base-class/empty-base';
import { Mixin } from 'src/app/instrumentation/mixins/mixin';
import { KeyMessagePair } from 'src/app/instrumentation/types/key-message-pair.type';

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
  public roundCustomErrorMessages: KeyMessagePair[] = [
    { key: 'min', message: error => 'Number of rounds must be greater than 0.' }
  ];

  public participantCustomErrorMessages: KeyMessagePair[] = [
    { key: 'min', message: error => 'Number of participants must be greater than 0.' },
    { key: 'mod', message: error => 'Number of participants must be divisible by 4.' },
    { key: 'minParticipant', message: error => `Number of participants must be at least ${error.min}.` }
  ];

  public constructor(public readonly errorMessage: ErrorMessageService, private readonly scheduleGenerator: ScheduleGeneratorService) {
    super();
    this.subscription.add(
      this.controls.roundCount.valueChanges
        .pipe(tap(value => this.controls.participantCount.updateValueAndValidity()))
        .subscribe()
    );
    this.subscription.add(
      combineLatest([this.controls.roundCount.valueChanges, this.controls.participantCount.valueChanges])
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

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid ? null : { roundParticipantCount: {} };
  }

  private get inputValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => this.scheduleGenerator.validateGenerateScheduleQuery(this.formGroup.value).pipe(map(response => response?.data ? null : { unavailable: true }));
  }
}
