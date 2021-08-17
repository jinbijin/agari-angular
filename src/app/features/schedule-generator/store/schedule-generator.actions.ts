import { ErrorData } from 'src/app/instrumentation/types/response/error-data.type';
import { Response } from 'src/app/instrumentation/types/response/response.type';
import { RoundRobinSchedule } from 'src/app/instrumentation/types/schedule/round-robin-schedule.type';
import { RoundRobinInputKey } from 'src/app/widgets/round-robin-input/round-robin-input-controls.type';

export class RoundRobinInputFormSubmitted {
  static readonly type = '[Schedule generator page] Round robin input form submitted';
  constructor(public readonly payload: Record<RoundRobinInputKey, number>) {}
}

export class ApiResponded {
  static readonly type = '[Schedule generator API] Responded';
  constructor(public readonly payload: Response<RoundRobinSchedule, ErrorData>, public readonly request: Record<RoundRobinInputKey, number>) {}
}

export class ApiErrored {
  static readonly type = '[Schedule generator API] Errored';
}
