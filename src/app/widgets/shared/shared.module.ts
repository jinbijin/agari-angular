import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { AsOrdinalPipe } from './pipes/as-ordinal.pipe';

@NgModule({
  declarations: [AsOrdinalPipe],
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    AsOrdinalPipe
  ]
})
export class SharedModule {}
