export class Mapper {
  public static mapRecord<T, U, V extends string>(value: Record<V, T>, map: (value: T) => U): Record<V, U> {
    const obj = {} as Record<V, U>;
    const keys = Object.keys(value);
    for (const key of keys) {
      obj[key] = map(value[key]);
    }
    return obj;
  }

  public static mapRecordExt<T, U, V extends string>(
    value: Record<V, T>,
    map: (value: Record<V, T>, key: V) => U
  ): Record<V, U> {
    const obj = {} as Record<V, U>;
    const keys = Object.keys(value);
    for (const key of keys) {
      obj[key] = map(value, key as V);
    }
    return obj;
  }
}
