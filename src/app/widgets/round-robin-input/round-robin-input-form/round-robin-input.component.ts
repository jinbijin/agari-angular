import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RoundRobinInputControls } from '../round-robin-input-controls.type';
import { RoundRobinInputDirective } from '../round-robin-input.directive';

@Component({
  selector: 'agari-round-robin-input-form',
  templateUrl: './round-robin-input-form.component.html',
  styleUrls: ['./round-robin-input-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundRobinInputComponent implements OnInit, OnDestroy {
  readonly #subscriptions: Subscription = new Subscription();
  readonly controls: RoundRobinInputControls;
  readonly possibleRoundCounts$: Observable<number[] | null>;

  constructor(roundRobinInputDirective: RoundRobinInputDirective) {
    this.controls = roundRobinInputDirective.controls;
    this.possibleRoundCounts$ = roundRobinInputDirective.possibleRoundCounts$;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }

  // TODO use and/or refactor ErrorMessageModule for this
  getParticipantCountErrorMessage(): string {
    if (this.controls.participantCount.hasError('required')) {
      return 'Please enter a number';
    }

    return '';
  }
}
