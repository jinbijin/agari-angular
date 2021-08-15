import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {}
