import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Status } from 'src/app/instrumentation/enum/status.enum';
import { EmptyBase } from 'src/app/instrumentation/mixins/base-class/empty-base';
import { Mixin } from 'src/app/instrumentation/mixins/mixin';
import { ObservableHelper } from 'src/app/instrumentation/observable/observable.helper';
import { AgariValidators } from 'src/app/instrumentation/validators/agari-validators';

import { GenerateSchedule } from '../../store/schedule-generator.action';

@Component({
  selector: 'agari-schedule-generator-request',
  templateUrl: './schedule-generator-request.component.html',
  styleUrls: ['./schedule-generator-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorRequestComponent extends Mixin.Reactive(EmptyBase)
  implements OnInit {
  constructor(private readonly store: Store) {
    super();
    const roundCount: FormControl = new FormControl(undefined, [
      Validators.required,
      Validators.min(1)
    ]);
    this.controls = {
      roundCount,
      participantCount: new FormControl(undefined, [
        Validators.required,
        Validators.min(1),
        AgariValidators.mod(4, 0),
        AgariValidators.minParticipant(roundCount)
      ])
    };
    this.formGroup = new FormGroup(this.controls);
    this.subscription.add(
      roundCount.valueChanges
        .pipe(
          tap(value => {
            this.controls.participantCount.updateValueAndValidity();
          })
        )
        .subscribe()
    );
  }

  public formGroup: FormGroup;

  public controls: {
    roundCount: FormControl;
    participantCount: FormControl;
  };

  private statusSubject: Subject<Status> = new BehaviorSubject(Status.Idle);

  public status$: Observable<Status> = this.statusSubject.asObservable();

  public ngOnInit(): void {}

  public onSubmit(): void {
    ObservableHelper.setStatus(
      this.store.dispatch(
        new GenerateSchedule({
          roundCount: this.controls.roundCount.value,
          participantCount: this.controls.participantCount.value
        })
      ),
      value => this.statusSubject.next(value)
    ).subscribe();
  }
}
