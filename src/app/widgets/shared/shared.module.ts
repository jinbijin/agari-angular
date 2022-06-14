import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PageLayoutComponent } from './layout/page-layout/page-layout.component';
import { AsOrdinalPipe } from './pipes/as-ordinal.pipe';

const modules: Type<any>[] = [
  CommonModule,
  ReactiveFormsModule,
  PageLayoutComponent,
  AsOrdinalPipe,
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class SharedModule {}
