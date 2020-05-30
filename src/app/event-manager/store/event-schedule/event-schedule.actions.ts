const actionTag: string = '[Schedule]';

export class Generate {
  public static readonly type: string = `${actionTag} Generate`;
}

export class Regenerate {
  public static readonly type: string = `${actionTag} Regenerate`;
}

export class Clear {
  public static readonly type: string = `${actionTag} Clear`;
}
