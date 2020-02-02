import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let page: Page;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [TestHostComponent, LayoutComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });

  it('should take parameter as title', () => {
    expect(page.title.textContent).toEqual('Title');
  });
});

class Page extends PageBase<TestHostComponent> {
  get root(): HTMLElement {
    return this.query<HTMLElement>('agari-layout');
  }

  get title(): HTMLElement {
    return this.query<HTMLElement>('h2');
  }
}

@Component({
  template: `
    <agari-layout title="Title"></agari-layout>
  `
})
class TestHostComponent {}
