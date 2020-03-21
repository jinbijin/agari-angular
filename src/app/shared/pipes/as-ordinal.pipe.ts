import { Pipe, PipeTransform } from '@angular/core';
import { Transforms } from 'src/app/instrumentation/transforms/transforms';

@Pipe({
  name: 'asOrdinal'
})
export class AsOrdinalPipe implements PipeTransform {
  public transform: (index: number) => number = Transforms.asOrdinal;
}
