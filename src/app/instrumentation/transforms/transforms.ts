import { ParticipantResult } from '../types/participant-result.type';

export class Transforms {
  public static asNumber(value: string): number {
    return +value;
  }
  public static asOrdinal(index: number): number {
    return index + 1;
  }

  public static asScore(timesSixty?: number): number | undefined {
    return timesSixty !== undefined ? timesSixty / 60 : undefined;
  }

  public static breakdown(participantResult: ParticipantResult): string {
    const basicString = Transforms.asScore(participantResult.basicScoreTimesSixty)?.toFixed(1);
    const signString =
      (Transforms.asScore(participantResult.placementScoreTimesSixty) as number) >= 0 ? '+' : '\u2212';
    const placementString = Transforms.asScore(Math.abs(participantResult.placementScoreTimesSixty))?.toFixed(
      1
    );
    return `(${basicString} ${signString} ${placementString})`;
  }
}
