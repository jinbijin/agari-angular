import { Action, State, StateContext, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssertService } from 'src/app/core/services/assert.service';
import { GenerateScheduleGQL } from 'src/app/graphql/generated/types';
import { ComparisonResult } from 'src/app/instrumentation/enum/comparison-result.enum';
import { EventPhase } from 'src/app/instrumentation/types/event-status/event-phase.enum';
import { GlobalState } from 'src/app/instrumentation/types/global-state/global-state.type';
import { StateNames } from 'src/app/instrumentation/types/global-state/state-names.type';
import { RoundParticipantCount } from 'src/app/instrumentation/types/round-participant-count.type';

import { EventStatusService } from '../../services/event-status.service';

import { Clear, Generate, Regenerate } from './event-schedule.actions';
import { defaultEventScheduleStateModel, EventScheduleStateModel } from './event-schedule.state-model';

@State<EventScheduleStateModel>({
  name: StateNames.eventScheduleState,
  defaults: defaultEventScheduleStateModel,
})
export class EventScheduleState {
  constructor(
    private readonly store: Store,
    private readonly generateSchedule: GenerateScheduleGQL,
    private readonly eventStatus: EventStatusService,
    private readonly assert: AssertService
  ) {}

  @Action(Generate)
  public generate(ctx: StateContext<EventScheduleStateModel>): Observable<void> {
    this.assertAfterConfiguration();
    this.assertScheduleUndefined(ctx);
    const roundParticipantCount = this.assertRoundParticipantCountSet();
    return this.generateSchedule.fetch(roundParticipantCount, { fetchPolicy: 'network-only' }).pipe(
      map((response) => {
        ctx.patchState({ schedule: response.data.generateSchedule });
      })
    );
  }

  @Action(Regenerate)
  public regenerate(ctx: StateContext<EventScheduleStateModel>): Observable<void> {
    this.assertBeforeRound();
    this.assertScheduleSet(ctx);
    const roundParticipantCount = this.assertRoundParticipantCountSet();
    return this.generateSchedule.fetch(roundParticipantCount, { fetchPolicy: 'network-only' }).pipe(
      map((response) => {
        ctx.patchState({ schedule: response.data.generateSchedule });
      })
    );
  }

  @Action(Clear)
  public clear(ctx: StateContext<EventScheduleStateModel>): void {
    this.assertBeforeRegistration();
    this.assertScheduleSet(ctx);
    ctx.patchState({ schedule: undefined });
  }

  private assertRoundParticipantCountSet(): RoundParticipantCount {
    const roundParticipantCount = this.store.selectSnapshot(
      (state: GlobalState) => state[StateNames.eventConfigurationState]
    ).roundParticipantCount;
    this.assert.nonNullable(roundParticipantCount, 'Configuration must be set for this action.');
    return roundParticipantCount;
  }

  private assertScheduleSet(ctx: StateContext<EventScheduleStateModel>): void {
    this.assert.nonNullable(ctx.getState().schedule, 'Schedule has not been set.');
  }

  private assertScheduleUndefined(ctx: StateContext<EventScheduleStateModel>): void {
    this.assert.undefined(ctx.getState().schedule, 'Schedule is already set.');
  }

  private assertAfterConfiguration(): void {
    const status = this.store.selectSnapshot((state: GlobalState) => state[StateNames.eventStatusState])
      .status;
    if (this.eventStatus.compare(status, { phase: EventPhase.Schedule }) === ComparisonResult.LessThan) {
      throw new Error('Schedule cannot be generated yet.');
    }
  }

  private assertBeforeRegistration(): void {
    const status = this.store.selectSnapshot((state: GlobalState) => state[StateNames.eventStatusState])
      .status;
    if (this.eventStatus.compare(status, { phase: EventPhase.Schedule }) === ComparisonResult.GreaterThan) {
      throw new Error('Schedule cannot be cleared anymore.');
    }
  }

  private assertBeforeRound(): void {
    const status = this.store.selectSnapshot((state: GlobalState) => state[StateNames.eventStatusState])
      .status;
    if (
      this.eventStatus.compare(status, { phase: EventPhase.Registration }) === ComparisonResult.GreaterThan
    ) {
      throw new Error('Schedule cannot be regenerated anymore.');
    }
  }
}
