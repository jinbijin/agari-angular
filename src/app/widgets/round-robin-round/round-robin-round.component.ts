import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RoundRobinRound } from 'src/app/instrumentation/types/schedule/round-robin-round.type';

@Component({
  selector: 'agari-round-robin-round',
  templateUrl: './round-robin-round.component.html',
  styleUrls: ['./round-robin-round.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundRobinRoundComponent {
  @Input() roundNumber: number;
  @Input() round: RoundRobinRound;
}
