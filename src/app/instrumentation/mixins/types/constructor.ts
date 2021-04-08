export type Constructor<T = Record<string, never>> = new (...args: any[]) => T;
