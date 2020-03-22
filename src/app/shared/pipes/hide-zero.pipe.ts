import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideZero'
})
export class HideZeroPipe implements PipeTransform {
  public transform(value?: number): number | undefined {
    return value || undefined;
  }
}
