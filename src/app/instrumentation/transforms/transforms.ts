export class Transforms {
  public static asNumber(value: string): number {
    return +value;
  }
  public static asOrdinal(index: number): number {
    return index + 1;
  }
}
