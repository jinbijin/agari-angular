import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let page: Page;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [TestHostComponent, HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    page = new Page(fixture);
    fixture.detectChanges();
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

  constructor(fixture: ComponentFixture<TestHostComponent>) {
    super(fixture);
  }
}

@Component({
  template: `
    <agari-header></agari-header>
  `
})
class TestHostComponent {}
