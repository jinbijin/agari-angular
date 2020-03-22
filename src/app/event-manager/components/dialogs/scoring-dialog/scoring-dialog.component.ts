import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transforms } from 'src/app/instrumentation/transforms/transforms';
import { GameResult } from 'src/app/instrumentation/types/game-result.type';
import { ScheduleGameIndex } from 'src/app/instrumentation/types/schedule-game-index.type';
import { AgariValidators } from 'src/app/instrumentation/validators/agari-validators';

@Component({
  templateUrl: './scoring-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoringDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: { index: ScheduleGameIndex; game: GameResult }
  ) {}

  private readonly scoreRegex = new RegExp(/^\d*\.?\d{0,1}$/);

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
      [AgariValidators.zeroSum]
    ),
    bonusScore: new FormGroup({
      [this.keys[0]]: new FormControl(Transforms.asScore(this.data.game[this.keys[0]]?.bonusScore), [
        Validators.pattern(this.scoreRegex)
      ]),
      [this.keys[1]]: new FormControl(Transforms.asScore(this.data.game[this.keys[1]]?.bonusScore), [
        Validators.pattern(this.scoreRegex)
      ]),
      [this.keys[2]]: new FormControl(Transforms.asScore(this.data.game[this.keys[2]]?.bonusScore), [
        Validators.pattern(this.scoreRegex)
      ]),
      [this.keys[3]]: new FormControl(Transforms.asScore(this.data.game[this.keys[3]]?.bonusScore), [
        Validators.pattern(this.scoreRegex)
      ])
    })
  }) as any;
}
