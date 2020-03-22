import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ScoreConverterService } from 'src/app/event-manager/services/score-converter.service';
import {
  FinalizeRoundResult,
  SetGameResult,
  UnsetGameResult
} from 'src/app/event-manager/store/event-manager.actions';
import { EventManagerState } from 'src/app/event-manager/store/event-manager.state';
import { EmptyBase } from 'src/app/instrumentation/mixins/base-class/empty-base';
import { Mixin } from 'src/app/instrumentation/mixins/mixin';
import { GameResult } from 'src/app/instrumentation/types/game-result.type';
import { Participant } from 'src/app/instrumentation/types/participant.type';
import { RoundResult } from 'src/app/instrumentation/types/round-result.type';

import { ScoringDialogComponent } from '../../dialogs/scoring-dialog/scoring-dialog.component';

@Component({
  selector: 'agari-event-scoring-step',
  templateUrl: './event-scoring-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventScoringStepComponent extends Mixin.TrackByIndex(EmptyBase) {
  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store,
    private readonly scoreConverter: ScoreConverterService
  ) {
    super();
  }

  @Input() public index: number;

  @Select(EventManagerState.participant)
  public participant$: Observable<(index: number) => Participant | undefined>;

  @Select(EventManagerState.result)
  public result$: Observable<(index: number) => RoundResult | undefined>;

  @Select(EventManagerState.roundReady)
  public ready$: Observable<(index: number) => boolean>;

  @Select(EventManagerState.eventFlag)
  public eventFinalized$: Observable<boolean>;

  @Output() public previous: EventEmitter<void> = new EventEmitter();
  @Output() public next: EventEmitter<void> = new EventEmitter();

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
        filter(value => !!value),
        map(value => this.scoreConverter.convert(value)),
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

  public goToPrevious(): void {
    this.previous.emit();
  }

  public goToNext(): void {
    this.next.emit();
  }

  public finalize(): void {
    this.store.dispatch(new FinalizeRoundResult({ index: this.index }));
    this.goToNext();
  }
}
