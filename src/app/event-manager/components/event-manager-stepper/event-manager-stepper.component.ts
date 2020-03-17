import { AfterViewInit, ChangeDetectionStrategy, Component, QueryList, ViewChildren } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'agari-event-manager-stepper',
  templateUrl: './event-manager-stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventManagerStepperComponent implements AfterViewInit {
  private readonly subscriptions: Subscription = new Subscription();

  @ViewChildren(MatExpansionPanel) public panels: QueryList<MatExpansionPanel>;

  private readonly currentStep: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public ngAfterViewInit(): void {
    for (const [index, panel] of this.panels.toArray().entries()) {
      const rank = index + 1;
      this.subscriptions.add(
        this.currentStep
          .pipe(
            filter(step => step === rank),
            tap(() => panel.open())
          )
          .subscribe()
      );
      this.subscriptions.add(panel.opened.pipe(tap(() => this.setStep(index + 1))).subscribe());
    }
  }

  private setStep(step: number): void {
    this.currentStep.next(step);
  }
}
