import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AgariLayoutAsideComponent } from './aside/agari-layout-aside.component';
import { AgariLayoutContentComponent } from './content/agari-layout-content.component';
import { AgariLayoutFooterComponent } from './footer/agari-layout-footer.component';
import { AgariLayoutHeaderComponent } from './header/agari-layout-header.component';
import { AgariLayoutComponent } from './agari-layout.component';

@NgModule({
  declarations: [
    AgariLayoutComponent,
    AgariLayoutAsideComponent,
    AgariLayoutContentComponent,
    AgariLayoutFooterComponent,
    AgariLayoutHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  exports: [AgariLayoutComponent]
})
export class AgariLayoutModule {}
