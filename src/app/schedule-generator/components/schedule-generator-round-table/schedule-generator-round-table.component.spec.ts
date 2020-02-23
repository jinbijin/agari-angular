import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { ScheduleRound } from 'src/app/graphql/generated/types';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ScheduleGeneratorRoundTableComponent } from './schedule-generator-round-table.component';

describe('ScheduleGeneratorRoundTableComponent', () => {
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ScheduleGeneratorRoundTableComponent],
      imports: [MatTableModule],
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
  public get rootComponent(): ScheduleGeneratorRoundTableComponent {
    return this.component(
      ScheduleGeneratorRoundTableComponent
    ) as ScheduleGeneratorRoundTableComponent;
  }

  public get hostComponent(): TestHostComponent {
    return this.component() as TestHostComponent;
  }
}

@Component({
  template: `
    <agari-schedule-generator-round-table
      [scheduleRound]="scheduleRound"
    ></agari-schedule-generator-round-table>
  `
})
class TestHostComponent {
  public scheduleRound: ScheduleRound = {
    games: []
  };
}
