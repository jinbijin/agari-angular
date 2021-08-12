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
import { ErrorMessageService } from './services/error-message.service';
import { ExcelExportService } from './services/excel-export.service';
import { ScheduleGeneratorService } from './services/schedule-generator.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule,
    PwaModule,
    RouterModule,
    PageLayoutModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PwaModule,
    RouterModule,
    PageLayoutModule,
  ],
  providers: []
})
export class CoreModule {
  public static forRoot(): Required<ModuleWithProviders<CoreModule>> {
    return {
      ngModule: CoreModule,
      providers: [
        ErrorMessageService,
        ExcelExportService,
        ScheduleGeneratorService,
        ...PwaModule.forRoot().providers,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...RouterModule.forRoot(ROOT_ROUTES).providers!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...NgxsModule.forRoot([]).providers!
      ]
    }
  }
}
