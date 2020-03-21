import { Pipe, PipeTransform } from '@angular/core';

import { Transforms } from '../transforms/as-ordinal.transform';

@Pipe({
  name: 'asOrdinal'
})
export class AsOrdinalPipe implements PipeTransform {
  public transform: (index: number) => number = Transforms.asOrdinal;
}
