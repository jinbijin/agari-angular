import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AssertService {
  public nonNullable<T>(value: T, message?: string): asserts value is NonNullable<T> {
    if (value === null || value === undefined) {
      throw new Error(message || 'Value is expected to be defined, but is undefined.');
    }
  }

  public undefined<T>(value: T, message?: string): asserts value is T & (null | undefined) {
    if (value !== null && value !== undefined) {
      throw new Error(message || 'Value is expected to be undefined, but is defined.');
    }
  }
}
