import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { KeyMessagePair } from 'src/app/instrumentation/types/key-message-pair.type';

@Injectable()
export class ErrorMessageService {
  private readonly errorMessages: KeyMessagePair[] = [
    { key: 'required', message: error => 'This field is required.' },
    { key: 'pattern', message: error => 'Invalid input.' }
  ];

  public display(errors: ValidationErrors, customMessages?: KeyMessagePair[]): string | undefined {
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
  }
}
