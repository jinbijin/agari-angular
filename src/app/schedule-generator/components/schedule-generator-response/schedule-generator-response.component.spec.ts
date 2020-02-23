import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { GenerateScheduleGQL } from 'src/app/graphql/generated/types';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ScheduleGeneratorResponseComponent } from './schedule-generator-response.component';

describe('ScheduleGeneratorResponseComponent', () => {
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ScheduleGeneratorResponseComponent],
      imports: [NgxsModule.forRoot([])],
      providers: [{ provide: GenerateScheduleGQL, useFactory: () => {} }],
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
    return this.query<HTMLElement>('agari-schedule-generator-response');
  }
}

@Component({
  template: `
    <agari-schedule-generator-response></agari-schedule-generator-response>
  `
})
class TestHostComponent {}
