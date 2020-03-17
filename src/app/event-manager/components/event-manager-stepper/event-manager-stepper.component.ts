import { AfterViewInit, ChangeDetectionStrategy, Component, QueryList, ViewChildren } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { EventManagerStepComponent } from '../event-manager-step/event-manager-step.component';

@Component({
  selector: 'agari-event-manager-stepper',
  templateUrl: './event-manager-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventManagerStepperComponent implements AfterViewInit {
  private readonly subscriptions: Subscription = new Subscription();

  @ViewChildren(EventManagerStepComponent) public steps: QueryList<EventManagerStepComponent>;
  @ViewChildren(MatExpansionPanel) public panels: QueryList<MatExpansionPanel>;

  private readonly currentStep: BehaviorSubject<number> = new BehaviorSubject<number>(1);

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

  private setStep(step: number): void {
    this.currentStep.next(step);
  }
}
