import { NgModule } from '@angular/core';
import { ErrorPolicyDirective } from './error-policy/error-policy.directive';
import { FormFieldModule } from './form-field/form-field.module';
import { InputModule } from './input/input.module';
import { LabelModule } from './label/label.module';
import { ValidationMessageModule } from './validation-message/validation-message.module';

@NgModule({
    declarations: [ErrorPolicyDirective],
    imports: [FormFieldModule, InputModule, LabelModule, ValidationMessageModule],
    exports: [FormFieldModule, InputModule, LabelModule, ValidationMessageModule, ErrorPolicyDirective],
})
export class FormModule {}
