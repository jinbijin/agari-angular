import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { PageLayoutModule } from './page-layout/page-layout.module';
import { PwaModule } from './pwa/pwa.module';
import { ROOT_ROUTES } from './root.routes';
import { ScheduleGeneratorService } from './services/schedule-generator.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([]),
    PwaModule,
    RouterModule.forRoot(ROOT_ROUTES),
    PageLayoutModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule,
    PwaModule,
    RouterModule,
    PageLayoutModule,
  ],
  providers: [
    ScheduleGeneratorService,
  ]
})
export class CoreModule {}
