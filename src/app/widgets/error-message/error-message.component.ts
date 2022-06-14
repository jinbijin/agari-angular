import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorMessageService } from './error-message.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mat-error[agariErrorMessage]',
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
  @Input() control: AbstractControl;

  constructor(private readonly errorMessageService: ErrorMessageService) {}

  get errorMessage(): string | null {
    return this.errorMessageService.display(this.control.errors);
  }
}
