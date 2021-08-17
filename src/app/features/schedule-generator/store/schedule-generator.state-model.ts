import { Status } from 'src/app/instrumentation/enum/status.enum';
import { RoundRobinSchedule } from 'src/app/instrumentation/types/schedule/round-robin-schedule.type';
import { RoundRobinInputKey } from 'src/app/widgets/round-robin-input/round-robin-input-controls.type';

interface ScheduleGeneratorInProgress {
  status: Status.InProgress;
  request: Record<RoundRobinInputKey, number>;
}

interface ScheduleGeneratorFailed {
  status: Status.Failed;
  error: string;
}

interface ScheduleGeneratorDone {
  status: Status.Done;
  request: Record<RoundRobinInputKey, number>;
  schedule: RoundRobinSchedule;
}

export type ScheduleGeneratorStateModel = undefined | ScheduleGeneratorInProgress | ScheduleGeneratorFailed | ScheduleGeneratorDone;
