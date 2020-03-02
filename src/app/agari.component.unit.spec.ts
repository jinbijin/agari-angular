import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { AgariComponent } from './agari.component';

describe('AgariComponent', () => {
  let page: Page;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, AgariComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();
  });

  it('should create the app', () => {
    expect(page.root).toBeTruthy();
  });

  it('should include the header with default routes', () => {
    expect((page.header.attributes as any).routes).toBeUndefined();
  });

  it('should include the footer with default version', () => {
    expect((page.footer.attributes as any).version).toBeUndefined();
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): AgariComponent {
    return this.component(AgariComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get header(): HTMLElement {
    return this.query<HTMLElement>('agari-header');
  }

  public get footer(): HTMLElement {
    return this.query<HTMLElement>('agari-footer');
  }
}

@Component({
  template: `
    <agari-root></agari-root>
  `
})
class TestHostComponent {}
