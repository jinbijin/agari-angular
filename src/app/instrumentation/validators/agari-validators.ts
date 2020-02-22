import { AbstractControl, ValidatorFn } from '@angular/forms';

export class AgariValidators {
  public static mod(modulus: number, remainder: number): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value % modulus === remainder
        ? null
        : { mod: { modulus, remainder } };
    };
  }

  public static minParticipant(
    roundCountControl: AbstractControl
  ): ValidatorFn {
    return (control: AbstractControl) => {
      if (!roundCountControl || !control) {
        return null; // Some other validation should fail.
      }
      const roundCount = +roundCountControl.value;
      const participantCount = +control.value;
      const roundCountOddCeiling = roundCount + ((roundCount + 1) % 2);
      return participantCount >= 4 * roundCountOddCeiling
        ? null
        : { minParticipant: { min: 4 * roundCountOddCeiling } };
    };
  }
}
