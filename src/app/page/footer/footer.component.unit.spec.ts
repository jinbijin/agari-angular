import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let page: Page;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, FooterComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });

  it('should display version', () => {
    expect(page.matToolbar.textContent).toEqual('Agari v1.0.0');
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): FooterComponent {
    return this.component(FooterComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get matToolbar(): HTMLElement {
    return this.query<HTMLElement>('mat-toolbar');
  }
}

@Component({
  template: `
    <agari-footer version="1.0.0"></agari-footer>
  `
})
class TestHostComponent {}
