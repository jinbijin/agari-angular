import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { EmptyBase } from 'src/app/instrumentation/mixins/base-class/empty-base';
import { Mixin } from 'src/app/instrumentation/mixins/mixin';
import { RoundResult } from 'src/app/instrumentation/types/round-result.type';

import { EventManagerState } from '../../store/event-manager.state';
import { EventManagerStepComponent } from '../event-manager-step/event-manager-step.component';

@Component({
  selector: 'agari-event-manager-stepper',
  templateUrl: './event-manager-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventManagerStepperComponent extends Mixin.TrackByIndex(EmptyBase)
  implements AfterViewInit, OnDestroy {
  @ViewChildren(EventManagerStepComponent) public steps: QueryList<EventManagerStepComponent>;

  @Select(EventManagerState.configurationFlag)
  public readonly configFinalized$: Observable<boolean>;

  @Select(EventManagerState.registrationFlag)
  public readonly registrationFinalized$: Observable<boolean>;

  @Select(EventManagerState.results)
  public readonly results$: Observable<(RoundResult | undefined)[] | undefined>;

  private subscriptions: Subscription = new Subscription();

  private readonly currentStep: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public ngAfterViewInit(): void {
    this.resetSubscriptions();
    this.steps.changes.pipe(tap(() => this.resetSubscriptions())).subscribe();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public previousStep(): void {
    const current = this.currentStep.value;
    this.currentStep.next(current - 1);
  }

  public nextStep(): void {
    const current = this.currentStep.value;
    this.currentStep.next(current + 1);
  }

  private resetSubscriptions(): void {
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();
    for (const [index, step] of this.steps.toArray().entries()) {
      step.index = index;
      this.subscriptions.add(
        this.currentStep
          .pipe(
            filter(current => current === index),
            tap(() => step.panel.open())
          )
          .subscribe()
      );
      this.subscriptions.add(step.panel.opened.pipe(tap(() => this.setStep(index))).subscribe());
    }
  }

  private setStep(step: number): void {
    this.currentStep.next(step);
  }
}
