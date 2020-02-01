import { ComponentFixture } from '@angular/core/testing';

export abstract class PageBase<TComponent> {
  constructor(private fixture: ComponentFixture<TComponent>) {}

  protected query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }
}
