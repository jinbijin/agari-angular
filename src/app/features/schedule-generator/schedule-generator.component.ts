import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { RoundRobinInputDirective } from 'src/app/widgets/round-robin-input/round-robin-input.directive';
import { RoundRobinInputFormSubmitted } from './store/schedule-generator.actions';

@Component({
  templateUrl: './schedule-generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleGeneratorComponent {
  @ViewChild('formContainer', { read: RoundRobinInputDirective }) formContainer: RoundRobinInputDirective;

  constructor(private readonly store: Store) {}

  onSubmit(value: any): void {
    if (!this.formContainer.form.valid) {
      this.formContainer.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(new RoundRobinInputFormSubmitted(value));
  }
}
