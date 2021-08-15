import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { PwaModule } from './pwa/pwa.module';
import { AgariRoutingModule } from './routing/agari-routing.module';
import { ScheduleGeneratorService } from './services/schedule-generator.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([]),
    NgxsFormPluginModule.forRoot(),
    PwaModule,
    AgariRoutingModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule,
    PwaModule,
    AgariRoutingModule,
  ],
  providers: [
    ScheduleGeneratorService,
  ]
})
export class CoreModule {}
