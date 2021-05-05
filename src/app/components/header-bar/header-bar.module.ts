import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderBarBrandComponent } from './header-bar-brand/header-bar-brand.component';
import { HeaderBarMenuComponent } from './header-bar-menu/header-bar-menu.component';
import { HeaderBarComponent } from './header-bar.component';

@NgModule({
    declarations: [HeaderBarComponent, HeaderBarBrandComponent, HeaderBarMenuComponent],
    imports: [CommonModule],
    exports: [HeaderBarComponent, HeaderBarBrandComponent, HeaderBarMenuComponent]
})
export class HeaderBarModule {}
