import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AgariComponent } from './agari.component';
import { PageBase } from './instrumentation/test/page-base';

describe('AgariComponent', () => {
  let page: Page;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [TestHostComponent, AgariComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();
  });

  it('should create the app', () => {
    expect(page.rootComponent).toBeTruthy();
  });

  it('should have a header', () => {
    expect(page.header).toBeTruthy();
  });

  it('should have a content element', () => {
    expect(page.content).toBeTruthy();
  });

  it('should have a footer element', () => {
    expect(page.footer).toBeTruthy();
  });
});

class Page extends PageBase<TestHostComponent> {
  public get rootComponent(): AgariComponent {
    return this.component(AgariComponent) as AgariComponent;
  }

  public get hostComponent(): TestHostComponent {
    return this.component() as TestHostComponent;
  }

  get header() {
    return this.query<HTMLElement>('agari-header');
  }

  get content() {
    return this.query<HTMLElement>('agari-content');
  }

  get footer() {
    return this.query<HTMLElement>('agari-footer');
  }
}

@Component({
  template: `
    <agari-root></agari-root>
  `
})
class TestHostComponent {}
