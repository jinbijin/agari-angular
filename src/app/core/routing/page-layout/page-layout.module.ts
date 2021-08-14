import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PageLayoutAsideComponent } from './aside/page-layout-aside.component';
import { PageLayoutContentComponent } from './content/page-layout-content.component';
import { PageLayoutFooterComponent } from './footer/page-layout-footer.component';
import { PageLayoutHeaderComponent } from './header/page-layout-header.component';
import { PageLayoutComponent } from './page-layout.component';

@NgModule({
  declarations: [
    PageLayoutComponent,
    PageLayoutAsideComponent,
    PageLayoutContentComponent,
    PageLayoutFooterComponent,
    PageLayoutHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  exports: [PageLayoutComponent]
})
export class PageLayoutModule {}
