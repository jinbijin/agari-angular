import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ScheduleGeneratorComponent } from './schedule-generator.component';

describe('ScheduleGeneratorComponent', () => {
  let page: Page;

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [ScheduleGeneratorComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(ScheduleGeneratorComponent));
  });

  it('should create', () => {
    expect(page.component).toBeTruthy();
  });

  it('should use the standard page layout', () => {
    expect(page.agariLayout).toBeTruthy();
  });

  it('should contain the request form', () => {
    expect(page.agariScheduleGeneratorRequest).toBeTruthy();
  });
});

class Page extends PageBase<ScheduleGeneratorComponent> {
  get agariLayout(): HTMLElement {
    return this.query<HTMLElement>('agari-layout');
  }

  get agariScheduleGeneratorRequest(): HTMLElement {
    return this.query<HTMLElement>('agari-schedule-generator-request');
  }
}
