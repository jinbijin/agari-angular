import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, tap } from 'rxjs/operators';
import { ScheduleGeneratorService } from 'src/app/core/services/schedule-generator.service';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';

@Component({
  templateUrl: './round-participant-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundParticipantDialogComponent {
  public formGroup = new FormGroup({
    roundCount: new FormControl<number | null>(null, { validators: [Validators.required] }),
    participantCount: new FormControl<number | null>(null, { validators: [Validators.required] })
  }, { asyncValidators: this.inputValidator });

  public controls: RoundParticipantDialogComponent['formGroup']['controls'] = this.formGroup.controls;

  public constructor(private readonly scheduleGenerator: ScheduleGeneratorService, private readonly changeDetectorRef: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public readonly data: RoundParticipantCount) {}

  private get inputValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => this.scheduleGenerator.validateGenerateScheduleQuery(control.value)
      .pipe(
        map(response => response?.data ? null : { unavailable: true }),
        tap(() => this.changeDetectorRef.markForCheck())
      );
  }
}
