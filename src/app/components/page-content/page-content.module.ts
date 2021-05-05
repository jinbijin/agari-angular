import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageCenterContentComponent } from './page-center-content/page-center-content.component';
import { PageContentComponent } from './page-content.component';

@NgModule({
    declarations: [PageContentComponent, PageCenterContentComponent],
    imports: [CommonModule],
    exports: [PageContentComponent]
})
export class PageContentModule {}
