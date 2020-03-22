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
}
