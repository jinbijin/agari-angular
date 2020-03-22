import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SetGameResult, UnsetGameResult } from 'src/app/event-manager/store/event-manager.actions';
import { EventManagerState } from 'src/app/event-manager/store/event-manager.state';
import { GameResult } from 'src/app/instrumentation/types/game-result.type';
import { Participant } from 'src/app/instrumentation/types/participant.type';
import { RoundResult } from 'src/app/instrumentation/types/round-result.type';

import { ScoringDialogComponent } from '../../dialogs/scoring-dialog/scoring-dialog.component';

@Component({
  selector: 'agari-event-scoring-step',
  templateUrl: './event-scoring-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventScoringStepComponent {
  constructor(private readonly dialog: MatDialog, private readonly store: Store) {}

  @Input() public index: number;

  @Select(EventManagerState.participant)
  public participant$: Observable<(index: number) => Participant | undefined>;

  @Select(EventManagerState.result)
  public result$: Observable<(index: number) => RoundResult | undefined>;

  public Object = Object;

  public isSet(game: GameResult): boolean {
    return Object.keys(game)
      .map(n => game[n])
      .every(p => !!p);
  }

  public setScore(gameIndex: number, game: GameResult): void {
    const dialogRef = this.dialog.open(ScoringDialogComponent, {
      data: { index: { roundIndex: this.index, gameIndex }, game }
    });
    dialogRef
      .afterClosed()
      .pipe(
        map(value => this.mapValues(value)),
        tap(value =>
          this.store.dispatch(
            new SetGameResult({
              index: { roundIndex: this.index, gameIndex },
              game: value
            })
          )
        )
      )
      .subscribe();
  }

  public unsetScore(gameIndex: number): void {
    this.store.dispatch(new UnsetGameResult({ index: { roundIndex: this.index, gameIndex } }));
  }

  public trackGameByIndex(index: number, item: GameResult): number {
    return index;
  }

  private mapValues(value: any): GameResult {
    const keys = Object.keys(value.basicScore);
    const place = this.mapRatings(value);
    const obj = {};
    for (const key of keys) {
      obj[key] = {
        basicScoreTimesSixty: Math.round(value.basicScore[key] * 60),
        placementScoreTimesSixty: place[key],
        finalScoreTimesSixty: Math.round(value.basicScore[key] * 60) + place[key],
        bonusScoreTimesSixty: Math.round(value.bonusScore[key] * 60)
      };
    }
    return obj;
  }

  private mapRatings(value: any): any {
    const keys = Object.keys(value.basicScore);
    const obj = {};
    for (const key of keys) {
      obj[key] = this.placementBonus(value, key);
    }
    return obj;
  }

  private placementBonus(value: any, key: string): number {
    const keys = Object.keys(value.basicScore);
    return keys
      .filter(k => k !== key)
      .map(k => {
        const score = Math.round(value.basicScore[key] * 10);
        const opponentScore = Math.round(value.basicScore[k] * 10);
        if (opponentScore < score) {
          return 300;
        } else if (opponentScore === score) {
          return 0;
        } else {
          return -300;
        }
      })
      .reduce((acc, val) => acc + val, 0);
  }
}
