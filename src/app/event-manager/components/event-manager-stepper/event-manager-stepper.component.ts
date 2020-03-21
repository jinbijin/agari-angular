import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

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
  @ViewChildren(MatExpansionPanel) public panels: QueryList<MatExpansionPanel>;

  private readonly currentStep: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  @Select(EventManagerState.configurationFlag)
  public readonly configFinalized$: Observable<boolean>;

  public ngAfterViewInit(): void {
    for (const [index, step] of this.steps.toArray().entries()) {
      const rank = index + 1;
      step.rank = rank;
      this.subscriptions.add(
        this.currentStep
          .pipe(
            filter(current => current === rank),
            tap(() => step.panel.open())
          )
          .subscribe()
      );
      this.subscriptions.add(step.panel.opened.pipe(tap(() => this.setStep(index + 1))).subscribe());
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public nextStep(): void {
    const current = this.currentStep.value;
    this.currentStep.next(current + 1);
  }

  private setStep(step: number): void {
    this.currentStep.next(step);
  }
}
