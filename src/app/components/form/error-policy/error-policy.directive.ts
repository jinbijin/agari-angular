import { Directive, DoCheck, Input, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
    selector: '[agariErrorPolicy]',
})
export class ErrorPolicyDirective implements DoCheck {
    @Input('agariErrorPolicy') public control: AbstractControl;

    private viewRef: ViewRef | null = null;

    public constructor(private readonly templateRef: TemplateRef<any>, private readonly viewContainerRef: ViewContainerRef) { }

    public ngDoCheck(): void {
        if (this.viewRef && (this.control.valid || this.control.untouched)) {
            this.viewContainerRef.clear();
            this.viewRef = null;
            return;
        }

        if (!this.viewRef && this.control.invalid && this.control.touched) {
            this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
    }
}
