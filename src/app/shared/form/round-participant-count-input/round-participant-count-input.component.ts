import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Mixin } from 'src/app/instrumentation/mixins/mixin';
import { AgariValidators } from 'src/app/instrumentation/validators/agari-validators';

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
export class RoundParticipantCountInputComponent extends Mixin.Reactive()
  implements OnInit, ControlValueAccessor, Validator {
  constructor() {
    super();
    const roundCount: FormControl = new FormControl(undefined, [
      Validators.required,
      Validators.min(1)
    ]);
    this.controls = {
      roundCount,
      participantCount: new FormControl(undefined, [
        Validators.required,
        Validators.min(1),
        AgariValidators.mod(4, 0),
        AgariValidators.minParticipant(roundCount)
      ])
    };
    this.formGroup = new FormGroup(this.controls);
    this.subscription.add(
      roundCount.valueChanges
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

  public formGroup: FormGroup;

  public controls: {
    roundCount: FormControl;
    participantCount: FormControl;
  };

  public ngOnInit(): void {}

  public onChange: (event: any) => void = event => {};

  public onTouched: () => void = () => {};

  public writeValue(obj: any): void {
    this.controls.roundCount.setValue(obj.roundCount);
    this.controls.participantCount.setValue(obj.participantCount);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid ? null : { roundParticipantCount: {} };
  }
}
