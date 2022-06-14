import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RoundRobinInputControls } from '../round-robin-input-controls.type';
import { RoundRobinInputDirective } from '../round-robin-input.directive';

@Component({
  selector: 'agari-round-robin-input-form',
  templateUrl: './round-robin-input-form.component.html',
  styleUrls: ['./round-robin-input-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundRobinInputFormComponent implements OnDestroy {
  readonly #subscriptions: Subscription = new Subscription();
  readonly controls: RoundRobinInputControls;
  readonly possibleRoundCounts$: Observable<number[] | null>;

  constructor(roundRobinInputDirective: RoundRobinInputDirective) {
    this.controls = roundRobinInputDirective.controls;
    this.possibleRoundCounts$ = roundRobinInputDirective.possibleRoundCounts$;
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
