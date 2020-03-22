import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { EventManagerState } from 'src/app/event-manager/store/event-manager.state';
import { Transforms } from 'src/app/instrumentation/transforms/transforms';
import { GameResult } from 'src/app/instrumentation/types/game-result.type';
import { KeyMessagePair } from 'src/app/instrumentation/types/key-message-pair.type';
import { Participant } from 'src/app/instrumentation/types/participant.type';
import { ScheduleGameIndex } from 'src/app/instrumentation/types/schedule-game-index.type';
import { AgariErrorStateMatcher } from 'src/app/instrumentation/validators/agari-error-state-matcher';
import { AgariValidators } from 'src/app/instrumentation/validators/agari-validators';

@Component({
  templateUrl: './scoring-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoringDialogComponent {
  constructor(
    public readonly errorMessage: ErrorMessageService,
    @Inject(MAT_DIALOG_DATA) public readonly data: { index: ScheduleGameIndex; game: GameResult }
  ) {}

  public readonly customMessages: KeyMessagePair[] = [
    { key: 'pattern', message: error => 'Invalid input. Expected a number with at most one decimal (.).' },
    {
      key: 'zeroSum',
      message: error => `The scores must sum to zero. Actual sum: ${error.actualSum.toFixed(1)}`
    }
  ];

  @Select(EventManagerState.participant)
  public readonly participant$: Observable<(index: number) => Participant | undefined>;

  public matcher: AgariErrorStateMatcher = new AgariErrorStateMatcher();

  private readonly scoreRegex = new RegExp(/^\-?\d*\.?\d{0,1}$/);

  public keys: string[] = Object.keys(this.data.game);

  public formGroup: FormGroup & {
    controls: Record<'basicScore' | 'bonusScore', FormGroup & { controls: Record<string, FormControl> }>;
  } = new FormGroup({
    basicScore: new FormGroup(
      {
        [this.keys[0]]: new FormControl(
          Transforms.asScore(this.data.game[this.keys[0]]?.basicScoreTimesSixty),
          [Validators.required, Validators.pattern(this.scoreRegex)]
        ),
        [this.keys[1]]: new FormControl(
          Transforms.asScore(this.data.game[this.keys[1]]?.basicScoreTimesSixty),
          [Validators.required, Validators.pattern(this.scoreRegex)]
        ),
        [this.keys[2]]: new FormControl(
          Transforms.asScore(this.data.game[this.keys[2]]?.basicScoreTimesSixty),
          [Validators.required, Validators.pattern(this.scoreRegex)]
        ),
        [this.keys[3]]: new FormControl(
          Transforms.asScore(this.data.game[this.keys[3]]?.basicScoreTimesSixty),
          [Validators.required, Validators.pattern(this.scoreRegex)]
        )
      },
      { validators: [AgariValidators.zeroSum] }
    ),
    bonusScore: new FormGroup({
      [this.keys[0]]: new FormControl(
        Transforms.asScore(this.data.game[this.keys[0]]?.bonusScoreTimesSixty),
        [Validators.pattern(this.scoreRegex)]
      ),
      [this.keys[1]]: new FormControl(
        Transforms.asScore(this.data.game[this.keys[1]]?.bonusScoreTimesSixty),
        [Validators.pattern(this.scoreRegex)]
      ),
      [this.keys[2]]: new FormControl(
        Transforms.asScore(this.data.game[this.keys[2]]?.bonusScoreTimesSixty),
        [Validators.pattern(this.scoreRegex)]
      ),
      [this.keys[3]]: new FormControl(
        Transforms.asScore(this.data.game[this.keys[3]]?.bonusScoreTimesSixty),
        [Validators.pattern(this.scoreRegex)]
      )
    })
  }) as any;
}
