export const agariError: (strings: readonly string[], ...args: readonly string[]) => ((error: any) => string) =
  (strings: readonly string[], ...args: readonly string[]) =>
    (error: any) => {
      let result = strings[0];
      for (let i = 0; i < args.length; i++) {
        const argParts = args[i].split('.');
        const argValue = argParts.reduce((prev, curr) => prev?.[curr], error);
        result += argValue?.toString();
        result += strings[i+1];
      }
      return result;
    };
