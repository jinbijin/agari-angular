import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ScheduleGeneratorComponent } from './schedule-generator.component';

describe('ScheduleGeneratorComponent', () => {
  let page: Page;

  beforeEach(async () => await TestBed.configureTestingModule({
      declarations: [ScheduleGeneratorComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents());

  beforeEach(() => {
    page = new Page(TestBed.createComponent(ScheduleGeneratorComponent));
    page.detectChanges();
  });

  it('should create', () => {
    expect(page.root).toBeTruthy();
  });

  it('should use the standard page layout', () => {
    expect((page.agariLayout.attributes as any).title.value).toEqual('Schedule generator');
  });

  it('should contain the request form', () => {
    expect(page.agariScheduleGeneratorRequest).toBeTruthy();
  });

  it('should contain the response page', () => {
    expect(page.agariScheduleGeneratorResponse).toBeTruthy();
  });
});

class Page extends PageBase<ScheduleGeneratorComponent> {
  public get root(): ScheduleGeneratorComponent {
    return this.component();
  }

  get agariLayout(): HTMLElement {
    return this.query<HTMLElement>('agari-layout');
  }

  get agariScheduleGeneratorRequest(): HTMLElement {
    return this.query<HTMLElement>('agari-schedule-generator-request');
  }

  get agariScheduleGeneratorResponse(): HTMLElement {
    return this.query<HTMLElement>('agari-schedule-generator-response');
  }
}
