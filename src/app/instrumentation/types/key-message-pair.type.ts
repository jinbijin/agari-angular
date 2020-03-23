export interface KeyMessagePair {
  key: string;
  message: (error: any) => string;
}
