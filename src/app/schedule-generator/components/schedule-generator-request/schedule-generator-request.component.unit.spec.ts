import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { GenerateScheduleGQL } from 'src/app/graphql/generated/types';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ScheduleGeneratorState } from '../../store/schedule-generator.state';

import { ScheduleGeneratorRequestComponent } from './schedule-generator-request.component';

describe('ScheduleGeneratorRequestComponent', () => {
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ScheduleGeneratorRequestComponent],
      imports: [NgxsModule.forRoot([ScheduleGeneratorState])],
      providers: [{ provide: GenerateScheduleGQL, useFactory: () => {} }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    page = new Page(TestBed.createComponent(TestHostComponent));
    page.detectChanges();
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): ScheduleGeneratorRequestComponent {
    return this.component(ScheduleGeneratorRequestComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }
}

@Component({
  template: `
    <agari-schedule-generator-request></agari-schedule-generator-request>
  `
})
class TestHostComponent {}
