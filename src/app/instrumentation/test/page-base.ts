import { Injector, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export abstract class PageBase<TComponent> {
  constructor(public fixture: ComponentFixture<TComponent>) {
    fixture.detectChanges();
  }

  public get component(): TComponent {
    return this.fixture.debugElement.componentInstance;
  }

  public get injector(): Injector {
    return this.fixture.debugElement.injector;
  }

  protected query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }
}
