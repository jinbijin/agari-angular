import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';

@Component({
  templateUrl: './round-participant-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundParticipantDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: RoundParticipantCount) {}

  public formGroup: FormGroup & {
    controls: {
      roundParticipantCount: FormControl;
    };
  } = new FormGroup({
    roundParticipantCount: new FormControl(this.data)
  }) as any;
}
