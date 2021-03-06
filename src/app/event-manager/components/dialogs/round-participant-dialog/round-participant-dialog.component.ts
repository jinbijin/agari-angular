import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, tap } from 'rxjs/operators';
import { ScheduleGeneratorService } from 'src/app/core/services/schedule-generator.service';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';

@Component({
  templateUrl: './round-participant-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundParticipantDialogComponent implements OnInit {
  public formGroup: FormGroup;

  public controls: {
    roundCount: FormControl;
    participantCount: FormControl;
  };

  public constructor(private readonly scheduleGenerator: ScheduleGeneratorService, private readonly changeDetectorRef: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public readonly data: RoundParticipantCount) {}

  public ngOnInit(): void {
    this.controls = {
      roundCount: new FormControl(null, { validators: [Validators.required] }),
      participantCount: new FormControl(null, { validators: [Validators.required] })
    };
    this.formGroup = new FormGroup(this.controls, { asyncValidators: this.inputValidator });
  }

  private get inputValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => this.scheduleGenerator.validateGenerateScheduleQuery(control.value)
      .pipe(
        map(response => response?.data ? null : { unavailable: true }),
        tap(() => this.changeDetectorRef.markForCheck())
      );
  }
}
