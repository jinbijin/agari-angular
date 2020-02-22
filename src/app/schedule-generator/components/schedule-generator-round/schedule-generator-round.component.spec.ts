import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ScheduleGeneratorRoundComponent } from './schedule-generator-round.component';

describe('ScheduleGeneratorRoundCardComponent', () => {
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ScheduleGeneratorRoundComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });
});

class Page extends PageBase<TestHostComponent> {
  get root(): HTMLElement {
    return this.query<HTMLElement>('agari-schedule-generator-round');
  }
}

@Component({
  template: `
    <agari-schedule-generator-round></agari-schedule-generator-round>
  `
})
class TestHostComponent {}
