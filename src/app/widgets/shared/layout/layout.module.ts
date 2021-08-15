import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageLayoutModule } from './page-layout/page-layout.module';

@NgModule({
  imports: [
    CommonModule,
    PageLayoutModule,
  ],
  exports: [
    PageLayoutModule
  ]
})
export class LayoutModule {}
