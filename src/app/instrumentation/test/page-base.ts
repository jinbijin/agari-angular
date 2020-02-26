import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Injector, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export abstract class PageBase<TComponent> {
  constructor(public fixture: ComponentFixture<TComponent>) {}

  public get loader(): HarnessLoader {
    return TestbedHarnessEnvironment.loader(this.fixture);
  }

  public component(type?: Type<any>): any {
    let debugElement = this.fixture.debugElement;
    if (type) {
      debugElement = debugElement.query(By.directive(type));
    }
    return debugElement.componentInstance;
  }

  public detectChanges(): void {
    this.fixture.detectChanges();
  }

  protected query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }
}
