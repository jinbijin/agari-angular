import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Status } from 'src/app/instrumentation/enum/status.enum';

import { GenerateSchedule } from '../../store/schedule-generator.action';
import { ScheduleGeneratorState } from '../../store/schedule-generator.state';

@Component({
  selector: 'agari-schedule-generator-request',
  templateUrl: './schedule-generator-request.component.html',
  styleUrls: ['./schedule-generator-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleGeneratorRequestComponent implements OnInit {
  @Select(ScheduleGeneratorState.status)
  public status$: Observable<Status>;

  public formGroup: FormGroup;

  public controls: {
    roundParticipantCount: FormControl;
  };

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.controls = {
      roundParticipantCount: new FormControl({
        roundCount: undefined,
        participantCount: undefined
      })
    };
    this.formGroup = new FormGroup(this.controls);
  }

  public onSubmit(): void {
    this.store.dispatch(
      new GenerateSchedule(this.controls.roundParticipantCount.value)
    );
  }
}
