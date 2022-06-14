import { UntypedFormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class AgariErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control?.touched || false) && (form?.invalid || false);
  }
}
