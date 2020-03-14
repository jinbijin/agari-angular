import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Component({
  selector: 'agari-configuration-step',
  templateUrl: './configuration-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ConfigurationStepComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ConfigurationStepComponent), multi: true }
  ]
})
export class ConfigurationStepComponent implements ControlValueAccessor, Validator {
  public onChange: (value: any) => void = value => {};
  public onTouched: () => void = () => {};
  public writeValue(obj: any): void {}
  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  public validate(control: AbstractControl): ValidationErrors | null {
    return { invalid: true };
  }
}
