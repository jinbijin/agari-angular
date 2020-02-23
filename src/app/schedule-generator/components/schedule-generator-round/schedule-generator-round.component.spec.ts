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
    page.detectChanges();
  });

  it('should create', () => {
    expect(page.rootComponent).toBeTruthy();
  });
});

class Page extends PageBase<TestHostComponent> {
  public get rootComponent(): ScheduleGeneratorRoundComponent {
    return this.component(
      ScheduleGeneratorRoundComponent
    ) as ScheduleGeneratorRoundComponent;
  }

  public get hostComponent(): TestHostComponent {
    return this.component() as TestHostComponent;
  }
}

@Component({
  template: `
    <agari-schedule-generator-round></agari-schedule-generator-round>
  `
})
class TestHostComponent {}
