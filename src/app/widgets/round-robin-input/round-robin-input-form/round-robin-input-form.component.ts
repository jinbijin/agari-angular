import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { KeyMessagePair } from 'src/app/instrumentation/types/key-message-pair.type';
import { ErrorMessageService } from '../../error-message/error-message.service';
import { RoundRobinInputControls } from '../round-robin-input-controls.type';
import { RoundRobinInputDirective } from '../round-robin-input.directive';

@Component({
  selector: 'agari-round-robin-input-form',
  templateUrl: './round-robin-input-form.component.html',
  styleUrls: ['./round-robin-input-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundRobinInputFormComponent implements OnInit, OnDestroy {
  readonly #subscriptions: Subscription = new Subscription();
  readonly controls: RoundRobinInputControls;
  readonly possibleRoundCounts$: Observable<number[] | null>;

  constructor(
    roundRobinInputDirective: RoundRobinInputDirective,
    private readonly errorMessageService: ErrorMessageService,
  ) {
    this.controls = roundRobinInputDirective.controls;
    this.possibleRoundCounts$ = roundRobinInputDirective.possibleRoundCounts$;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }

  getParticipantCountErrorMessage(): string | undefined {
    if (this.controls.participantCount.errors) {
      return this.errorMessageService.display(this.controls.participantCount.errors);
    }
  }
}
