import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let page: Page;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [TestHostComponent, HeaderComponent],
      imports: [MatMenuModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });

  it(`should have brand 'アガリ'`, () => {
    expect(page.brand).toBeTruthy();
    expect(page.brand.textContent).toEqual('アガリ');
  });

  it('should have a menu button', () => {
    expect(page.menuButton).toBeTruthy();
  });
});

class Page extends PageBase<TestHostComponent> {
  get root(): HTMLElement {
    return this.query<HTMLElement>('agari-header');
  }

  get brand(): HTMLElement {
    return this.query<HTMLElement>('a');
  }

  get menuButton(): HTMLButtonElement {
    return this.query<HTMLButtonElement>('button');
  }
}

@Component({
  template: `
    <agari-header></agari-header>
  `
})
class TestHostComponent {}