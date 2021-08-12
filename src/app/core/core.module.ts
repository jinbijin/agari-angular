import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { PageLayoutModule } from './page-layout/page-layout.module';
import { PwaModule } from './pwa/pwa.module';
import { RootRoutingModule } from './root-routing/root-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule,
    PwaModule,
    RootRoutingModule,
    PageLayoutModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PwaModule,
    RootRoutingModule,
    PageLayoutModule,
  ],
  providers: []
})
export class CoreModule {
  public static forRoot(): Required<ModuleWithProviders<CoreModule>> {
    return {
      ngModule: CoreModule,
      providers: [
        ...RootRoutingModule.forRoot().providers,
        ...PwaModule.forRoot().providers,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...NgxsModule.forRoot([]).providers!
      ]
    }
  }
}
