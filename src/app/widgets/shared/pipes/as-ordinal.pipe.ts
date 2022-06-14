import { Pipe, PipeTransform } from '@angular/core';
import { Transforms } from 'src/app/instrumentation/transforms/transforms';

@Pipe({
  name: 'asOrdinal',
  standalone: true
})
export class AsOrdinalPipe implements PipeTransform {
  public transform: (index: number) => number = Transforms.asOrdinal;
}
