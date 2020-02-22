import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Status } from 'src/app/instrumentation/enum/status.enum';
import { ObservableHelper } from 'src/app/instrumentation/observable/observable.helper';

import { GenerateSchedule } from '../../store/schedule-generator.action';

@Component({
  selector: 'agari-schedule-generator-request',
  templateUrl: './schedule-generator-request.component.html',
  styleUrls: ['./schedule-generator-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorRequestComponent implements OnInit {
  constructor(private readonly store: Store) {
    this.controls = {
      roundCount: new FormControl(undefined, [
        Validators.required,
        Validators.min(1)
      ]),
      participantCount: new FormControl(undefined, [
        Validators.required,
        Validators.min(1),
        ScheduleGeneratorRequestComponent.modValidator(4, 0)
      ])
    };
    this.formGroup = new FormGroup(this.controls);
  }

  public formGroup: FormGroup;

  public controls: {
    roundCount: FormControl;
    participantCount: FormControl;
  };

  private statusSubject: Subject<Status> = new BehaviorSubject(Status.Idle);

  public status$: Observable<Status> = this.statusSubject.asObservable();

  private static modValidator(modulus: number, remainder: number): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value % modulus === remainder
        ? null
        : { mod: { modulus, remainder } };
    };
  }

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
