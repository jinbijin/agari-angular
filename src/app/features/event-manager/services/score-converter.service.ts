import { Injectable } from '@angular/core';
import { GameResult } from 'src/app/instrumentation/types/game-result.type';
import { ScoreForm } from 'src/app/instrumentation/types/score-form.type';

@Injectable()
export class ScoreConverterService {
  public convert(value: ScoreForm): GameResult {
    const keys = Object.keys(value.basicScore);
    const placementBonusTimesSixty = this.mapRatings(value);
    const obj = {};
    for (const key of keys) {
      obj[key] = {
        basicScoreTimesSixty: Math.round(value.basicScore[key] * 60),
        placementScoreTimesSixty: placementBonusTimesSixty[key],
        finalScoreTimesSixty: Math.round(value.basicScore[key] * 60) + placementBonusTimesSixty[key],
        bonusScoreTimesSixty: Math.round(value.bonusScore[key] * 60)
      };
    }
    return obj;
  }

  private mapRatings(value: ScoreForm): Record<string, number> {
    const keys = Object.keys(value.basicScore);
    const obj = {};
    for (const key of keys) {
      obj[key] = this.placementBonusTimesSixty(value, key);
    }
    return obj;
  }

  private placementBonusTimesSixty(value: ScoreForm, key: string): number {
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
