import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      roundParticipantCount: new FormControl({
        roundCount: undefined,
        participantCount: undefined
      })
    };
    this.formGroup = new FormGroup(this.controls);
  }

  public formGroup: FormGroup;

  public controls: {
    roundParticipantCount: FormControl;
  };

  private statusSubject: Subject<Status> = new BehaviorSubject(Status.Idle);

  public status$: Observable<Status> = this.statusSubject.asObservable();

  public ngOnInit(): void {}

  public onSubmit(): void {
    ObservableHelper.setStatus(
      this.store.dispatch(
        new GenerateSchedule(this.controls.roundParticipantCount.value)
      ),
      value => this.statusSubject.next(value)
    ).subscribe();
  }
}
