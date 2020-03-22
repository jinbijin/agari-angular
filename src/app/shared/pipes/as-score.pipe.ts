import { Pipe, PipeTransform } from '@angular/core';
import { Transforms } from 'src/app/instrumentation/transforms/transforms';

@Pipe({
  name: 'asScore'
})
export class AsScorePipe implements PipeTransform {
  public transform(value?: number): string | undefined {
    return Transforms.asScore(value)?.toFixed(1);
  }
}
