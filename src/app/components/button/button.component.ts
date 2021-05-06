import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[agariButton], a[agariButton]',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
    @HostBinding('attr.type') public type = 'button';
    @HostBinding('attr.data-color') @Input() public color: string;
}
