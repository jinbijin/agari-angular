import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
export class ScheduleGeneratorRequestComponent implements OnInit {
  @Select(ScheduleGeneratorState.status)
  public status$: Observable<Status>;

  public formGroup: FormGroup;

  public controls: {
    roundCount: FormControl;
    participantCount: FormControl;
  };

  public constructor(private readonly store: Store, private readonly scheduleGenerator: ScheduleGeneratorService, private readonly changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.controls = {
      roundCount: new FormControl(null, { validators: [Validators.required] }),
      participantCount: new FormControl(null, { validators: [Validators.required] })
    };
    this.formGroup = new FormGroup(this.controls, { asyncValidators: this.inputValidator });
  }

  public onSubmit(): void {
    this.store.dispatch(new GenerateSchedule(this.formGroup.value));
  }

  private get inputValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => this.scheduleGenerator.validateGenerateScheduleQuery(control.value)
      .pipe(
        map(response => response?.data ? null : { unavailable: true }),
        tap(() => this.changeDetectorRef.markForCheck())
      );
  }
}
