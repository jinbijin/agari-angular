import { GenerateScheduleQueryVariables } from 'src/app/graphql/generated/types';

export class GenerateSchedule {
  public static readonly type: string = '[Schedule] Generate';
  public constructor(public payload: GenerateScheduleQueryVariables) {}
}
