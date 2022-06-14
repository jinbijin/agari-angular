import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorMessageService } from 'src/app/widgets/error-message/error-message.service';
import { Participant } from 'src/app/instrumentation/types/participant.type';

@Component({
  templateUrl: './participant-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticipantDialogComponent {
  public formGroup: UntypedFormGroup & { controls: Record<keyof Participant, UntypedFormControl> } = new UntypedFormGroup({
    id: new UntypedFormControl(this.data.participant?.id),
    name: new UntypedFormControl(this.data.participant?.name, [Validators.required])
  }) as any;

  public constructor(
    public readonly errorMessage: ErrorMessageService,
    @Inject(MAT_DIALOG_DATA) public readonly data: { participant?: Participant; index: number }
  ) {}
}
