import { Directive, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';
import { AgariValidators } from 'src/app/instrumentation/validators/agari-validators';
import { RoundRobinInputApiService } from './round-robin-input-api.service';
import { RoundRobinInputControls } from './round-robin-input-controls.type';

@Directive({
  selector: '[agariRoundRobinInput]',
  exportAs: 'agariRoundRobinInput'
})
export class RoundRobinInputDirective implements OnInit, OnDestroy {
  readonly #subscriptions: Subscription = new Subscription();
  readonly controls: RoundRobinInputControls;
  readonly form: FormGroup;

  readonly #possibleRoundCounts: Subject<number[] | null> = new Subject<number[] | null>();
  readonly possibleRoundCounts$: Observable<number[] | null> = this.#possibleRoundCounts.asObservable();

  constructor(
    private readonly roundRobinInputApiService: RoundRobinInputApiService
  ) {
    this.controls = {
      participantCount: new FormControl(null, { validators: [Validators.required, AgariValidators.divisibleBy(4)] }),
      roundCount: new FormControl(null, { validators: [Validators.required] }),
    };
    this.form = new FormGroup(this.controls);
  }

  ngOnInit(): void {
    this.#subscriptions.add(this.controls.participantCount.valueChanges.pipe(
      filter(value => this.controls.participantCount.valid),
      tap(value => this.#possibleRoundCounts.next(null)),
      switchMap(value => this.roundRobinInputApiService.getMaxRounds(value)),
      filter(response => !!response.data),
      tap(response => this.#possibleRoundCounts.next(Array.from(Array(response?.data ?? 0).keys()).map(i => i + 1)))
    ).subscribe());
  }

  ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }
}
