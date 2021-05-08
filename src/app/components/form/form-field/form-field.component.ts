import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'agari-form-field',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent {}
