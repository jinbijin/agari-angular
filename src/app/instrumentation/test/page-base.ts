import { ComponentFixture } from '@angular/core/testing';

export abstract class PageBase<TComponent> {
  constructor(protected fixture: ComponentFixture<TComponent>) {}

  protected query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }
}
