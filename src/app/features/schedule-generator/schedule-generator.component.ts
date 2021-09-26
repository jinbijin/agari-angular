import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RoundRobinInputDirective } from 'src/app/widgets/round-robin-input/round-robin-input.directive';
import { ScheduleGeneratorStateModel } from './store/schedule-generator.state-model';
import { RoundRobinInputFormSubmitted } from './store/schedule-generator.actions';

@Component({
  templateUrl: './schedule-generator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleGeneratorComponent {
  @ViewChild('formContainer', { read: RoundRobinInputDirective }) formContainer: RoundRobinInputDirective;

  @Select(state => state.scheduleGenerator)
  readonly state$: Observable<ScheduleGeneratorStateModel>;

  constructor(private readonly store: Store) {}

  onSubmit(value: any): void {
    if (!this.formContainer.form.valid) {
      this.formContainer.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(new RoundRobinInputFormSubmitted(value));
  }
}
