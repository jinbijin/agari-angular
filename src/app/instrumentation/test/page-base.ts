import { Injector } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export abstract class PageBase<TComponent> {
  constructor(public fixture: ComponentFixture<TComponent>) {}

  public get component(): TComponent {
    return this.fixture.debugElement.componentInstance;
  }

  public get injector(): Injector {
    return this.fixture.debugElement.injector;
  }

  public detectChanges(): void {
    this.fixture.detectChanges();
  }

  protected query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }
}
