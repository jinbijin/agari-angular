import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'agari-event-manager-step',
  templateUrl: './event-manager-step.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventManagerStepComponent {
  @Input() public isFirstStep: boolean = false;

  @Input() public isLastStep: boolean = false;

  @Input() public stepControl: AbstractControl;

  private readonly finalizedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly finalized$: Observable<boolean> = this.finalizedSubject.asObservable();

  public finalize(): void {
    if (!this.finalizedSubject.value) {
      this.finalizedSubject.next(true);
    }
  }
}
