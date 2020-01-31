import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, BrowserAnimationsModule, FlexLayoutModule, HttpClientModule],
  exports: [BrowserAnimationsModule, FlexLayoutModule],
  providers: []
})
export class CoreModule {}
