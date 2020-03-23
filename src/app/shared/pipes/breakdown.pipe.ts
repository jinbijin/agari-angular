import { Pipe, PipeTransform } from '@angular/core';
import { Transforms } from 'src/app/instrumentation/transforms/transforms';
import { ParticipantResult } from 'src/app/instrumentation/types/participant-result.type';

@Pipe({ name: 'breakdown' })
export class BreakdownPipe implements PipeTransform {
  public transform: (value: ParticipantResult) => string = Transforms.breakdown;
}
