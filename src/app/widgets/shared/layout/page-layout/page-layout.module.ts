import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageLayoutComponent } from './page-layout.component';

@NgModule({
  declarations: [PageLayoutComponent],
  imports: [CommonModule, RouterModule],
  exports: [PageLayoutComponent]
})
export class PageLayoutModule {}
