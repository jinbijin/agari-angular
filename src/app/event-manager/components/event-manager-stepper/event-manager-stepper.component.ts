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
import { RoundResult } from 'src/app/instrumentation/types/round-result.type';

import { EventManagerState } from '../../store/event-manager.state';
import { EventManagerStepComponent } from '../event-manager-step/event-manager-step.component';

@Component({
  selector: 'agari-event-manager-stepper',
  templateUrl: './event-manager-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventManagerStepperComponent implements AfterViewInit, OnDestroy {
  private readonly subscriptions: Subscription = new Subscription();

  @ViewChildren(EventManagerStepComponent) public steps: QueryList<EventManagerStepComponent>;

  private readonly currentStep: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  @Select(EventManagerState.configurationFlag)
  public readonly configFinalized$: Observable<boolean>;

  @Select(EventManagerState.registrationFlag)
  public readonly registrationFinalized$: Observable<boolean>;

  @Select(EventManagerState.results)
  public readonly results$: Observable<(RoundResult | undefined)[] | undefined>;

  public ngAfterViewInit(): void {
    this.resetSubscriptions();
    this.steps.changes.pipe(tap(() => this.resetSubscriptions())).subscribe();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public trackStepBy(index: number, item: [number, RoundResult | undefined]): number {
    return item[0];
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
