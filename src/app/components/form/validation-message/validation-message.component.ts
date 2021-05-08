import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'agari-validation-message',
    templateUrl: './validation-message.component.html',
    styleUrls: ['./validation-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationMessageComponent {}
