import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventManagerState } from 'src/app/event-manager/store/event-manager.state';
import { GameResult } from 'src/app/instrumentation/types/game-result.type';
import { Participant } from 'src/app/instrumentation/types/participant.type';
import { RoundResult } from 'src/app/instrumentation/types/round-result.type';

@Component({
  selector: 'agari-event-scoring-step',
  templateUrl: './event-scoring-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventScoringStepComponent {
  @Input() public index: number;

  @Select(EventManagerState.participant)
  public participant$: Observable<(index: number) => Participant | undefined>;

  @Select(EventManagerState.result)
  public result$: Observable<(index: number) => RoundResult | undefined>;

  public Object = Object;

  public isSet(game: GameResult): boolean {
    return Object.keys(game)
      .map(n => game[n])
      .every(p => !!p);
  }
}
