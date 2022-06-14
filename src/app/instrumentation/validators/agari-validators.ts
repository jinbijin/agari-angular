import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export class AgariValidators {
  static divisibleBy(modulus: number): ValidatorFn {
    return (control: AbstractControl) => !control.value || control.value % modulus === 0
        ? null
        : { divisibleBy: { modulus } };
  }

  static mod(modulus: number, remainder: number): ValidatorFn {
    return (control: AbstractControl) => !control.value || control.value % modulus === remainder
        ? null
        : { mod: { modulus, remainder, actual: control.value % modulus } };
  }

  static minParticipant(roundCountControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl) => {
      if (!roundCountControl.value || !control.value) {
        return null; // Some other validation should fail.
      }
      const roundCount = +roundCountControl.value;
      const participantCount = +control.value;
      const roundCountOddCeiling = roundCount + ((roundCount + 1) % 2);
      return participantCount >= 4 * roundCountOddCeiling
        ? null
        : {
            minParticipant: {
              min: 4 * roundCountOddCeiling,
              actual: participantCount
            }
          };
    };
  }

  static zeroSum: ValidatorFn = (control: FormGroup) => {
    const keys = Object.keys(control.controls);
    let sum = 0;
    if (control.controls) {
      for (const key of keys) {
        if (!control.controls[key].value) {
          return null; // Some other validation should fail
        }
        // This is an integer, otherwise some other validation should fail
        sum += Math.round(+control.controls[key].value * 10);
      }
    }
    if (sum !== 0) {
      return { zeroSum: { actualSum: sum / 10 } };
    }
    return null;
  };
}
