import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ScheduleGeneratorRequestComponent } from './schedule-generator-request.component';

describe('ScheduleGeneratorRequestComponent', () => {
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ScheduleGeneratorRequestComponent],
      providers: [FormBuilder, { provide: Store, useFactory: () => {} }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });
});

class Page extends PageBase<TestHostComponent> {
  get root(): HTMLElement {
    return this.query<HTMLElement>('agari-schedule-generator-request');
  }
}

@Component({
  template: `
    <agari-schedule-generator-request></agari-schedule-generator-request>
  `
})
class TestHostComponent {}
