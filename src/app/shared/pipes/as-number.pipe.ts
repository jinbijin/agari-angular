import { Pipe, PipeTransform } from '@angular/core';
import { Transforms } from 'src/app/instrumentation/transforms/transforms';

@Pipe({
  name: 'asNumber'
})
export class AsNumberPipe implements PipeTransform {
  public transform: (value: string) => number = Transforms.asNumber;
}
