import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Constructor } from 'src/app/instrumentation/mixins/types/constructor';
import { AgariValidators } from 'src/app/instrumentation/validators/agari-validators';

export function RoundParticipantValueAccessor<T extends Constructor<any>>(
  Base: T
) {
  // tslint:disable-next-line: no-shadowed-variable
  return class RoundParticipantValueAccessor extends Base
    implements ControlValueAccessor {
    constructor(...args: any[]) {
      super(...args);
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
    }

    public formGroup: FormGroup;

    public controls: {
      roundCount: FormControl;
      participantCount: FormControl;
    };

    public onChange: (event: any) => void = event => {};

    public onTouched: () => void = () => {};

    public writeValue(obj: any): void {
      this.controls.roundCount.setValue(obj?.roundCount);
      this.controls.participantCount.setValue(obj?.participantCount);
    }

    public registerOnChange(fn: any): void {
      this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
      if (isDisabled) {
        this.controls.roundCount.disable();
        this.controls.participantCount.disable();
      } else {
        this.controls.roundCount.enable();
        this.controls.participantCount.enable();
      }
    }
  };
}
