import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let page: Page;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, FooterComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });
});

class Page extends PageBase<TestHostComponent> {
  get root(): HTMLElement {
    return this.query<HTMLElement>('agari-footer');
  }

  constructor(fixture: ComponentFixture<TestHostComponent>) {
    super(fixture);
  }
}

@Component({
  template: `
    <agari-footer></agari-footer>
  `
})
class TestHostComponent {}
