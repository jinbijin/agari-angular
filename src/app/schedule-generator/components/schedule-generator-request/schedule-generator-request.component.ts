import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ScheduleGeneratorService } from 'src/app/core/services/schedule-generator.service';
import { Status } from 'src/app/instrumentation/enum/status.enum';

import { GenerateSchedule } from '../../store/schedule-generator.action';
import { ScheduleGeneratorState } from '../../store/schedule-generator.state';

@Component({
  selector: 'agari-schedule-generator-request',
  templateUrl: './schedule-generator-request.component.html',
  styleUrls: ['./schedule-generator-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorRequestComponent implements OnInit, OnDestroy {
  @Select(ScheduleGeneratorState.status)
  public status$: Observable<Status>;

  public formGroup: FormGroup;

  public controls: {
    roundCount: FormControl;
    participantCount: FormControl;
  };

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  #subscriptions: Subscription = new Subscription();

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  #possibleRoundCounts: Subject<number[] | null> = new Subject<number[] | null>();

  public possibleRoundCounts$: Observable<number[] | null> = this.#possibleRoundCounts.asObservable();

  public constructor(private readonly store: Store, private readonly scheduleGenerator: ScheduleGeneratorService, private readonly changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.controls = {
      roundCount: new FormControl(null, { validators: [Validators.required] }),
      participantCount: new FormControl(null, { validators: [Validators.required] })
    };
    this.formGroup = new FormGroup(this.controls);

    this.#subscriptions.add(this.controls.participantCount.valueChanges.pipe(
      filter(value => this.controls.participantCount.valid),
      tap(value => this.#possibleRoundCounts.next(null)),
      switchMap(value => this.scheduleGenerator.getMaxRounds(value)),
      filter(response => !!response.data),
      tap(response => this.#possibleRoundCounts.next(Array.from(Array(response?.data ?? 0).keys()).map(i => i + 1)))
    ).subscribe());
  }

  public ngOnDestroy(): void {
    this.#subscriptions.unsubscribe();
  }

  public onSubmit(): void {
    this.store.dispatch(new GenerateSchedule(this.formGroup.value));
  }

  public getParticipantCountErrorMessage(): string {
    if (this.controls.participantCount.hasError('required')) {
      return 'Please enter a number';
    }

    return '';
  }
}
