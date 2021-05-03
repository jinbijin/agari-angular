import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageLayoutComponent } from './page-layout.component';

@NgModule({
    declarations: [PageLayoutComponent],
    imports: [CommonModule],
    exports: [PageLayoutComponent]
})
export class PageLayoutModule {}
