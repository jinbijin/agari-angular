import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Participant } from 'src/app/instrumentation/types/participant.type';

@Component({
  templateUrl: './participant-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticipantDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: { participant?: Participant; key: number }) {}

  public formGroup: FormGroup & { controls: Record<keyof Participant, FormControl> } = new FormGroup({
    id: new FormControl(this.data.participant?.id),
    name: new FormControl(this.data.participant?.name, [Validators.required])
  }) as any;

  public nameErrorMessage(errors: any): string | undefined {
    if (errors.required) {
      return 'This field is required.';
    }
  }
}
