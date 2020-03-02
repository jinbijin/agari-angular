import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserAnimationsModule, NgxsModule.forRoot([])],
  exports: [BrowserAnimationsModule],
  providers: []
})
export class CoreModule {}
