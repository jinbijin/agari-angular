import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../components/button/button.module';
import { FooterBarModule } from '../components/footer-bar/footer-bar.module';
import { HeaderBarModule } from '../components/header-bar/header-bar.module';

import { SharedModule } from '../shared/shared.module';

import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ContentComponent],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    RouterModule,
    ButtonModule,
    HeaderBarModule,
    FooterBarModule
  ],
  exports: [HeaderComponent, FooterComponent, ContentComponent],
  providers: []
})
export class PageModule {}
