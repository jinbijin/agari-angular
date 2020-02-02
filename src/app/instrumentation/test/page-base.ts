import { ComponentFixture } from '@angular/core/testing';

export abstract class PageBase<TComponent> {
  constructor(private fixture: ComponentFixture<TComponent>) {
    fixture.detectChanges();
  }

  public component(): TComponent {
    return this.fixture.debugElement.componentInstance;
  }

  public detectChanges(): void {
    return this.fixture.detectChanges();
  }

  protected query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }
}
