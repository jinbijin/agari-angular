import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { KeyMessagePair } from 'src/app/instrumentation/types/key-message-pair.type';
import { agariError } from './agari-error';

@Injectable()
export class ErrorMessageService {
  private readonly errorMessages: KeyMessagePair[] = [
    { key: 'required', message: agariError`This field is required.` },
    { key: 'pattern', message: agariError`Invalid input.` },
    { key: 'divisibleBy', message: agariError`Input is not divisible by ${'modulus'}.` },
  ];

  public display(errors: ValidationErrors | null, customMessages?: KeyMessagePair[]): string | null {
    if (!errors) { return null; }

    for (const keyMessagePair of this.errorMessages) {
      if (errors[keyMessagePair.key]) {
        const customKeyMessagePair = customMessages?.find(p => p.key === keyMessagePair.key);
        if (customKeyMessagePair) {
          return customKeyMessagePair.message(errors[keyMessagePair.key]);
        }
        return keyMessagePair.message(errors[keyMessagePair.key]);
      }
    }
    if (customMessages) {
      for (const keyMessagePair of customMessages) {
        if (errors[keyMessagePair.key]) {
          return keyMessagePair.message(errors[keyMessagePair.key]);
        }
      }
    }

    return null;
  }
}
