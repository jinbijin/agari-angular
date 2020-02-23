import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { ScheduleGame, ScheduleRound } from 'src/app/graphql/generated/types';
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
  });

  it('should create', () => {
    page.hostComponent.scheduleRound = {
      games: []
    };
    page.detectChanges();

    expect(page.rootComponent).toBeTruthy();
  });

  it('should compute the correct table configuration', () => {
    page.hostComponent.scheduleRound = {
      games: [
        { participantNrs: [1, 2, 3, 4] },
        { participantNrs: [5, 6, 7, 8] }
      ]
    };
    page.detectChanges();

    expect(page.rootComponent.tableConfiguration.headers).toEqual(false);
    expect(page.rootComponent.tableConfiguration.dataSource.data).toEqual([
      [0, { participantNrs: [1, 2, 3, 4] }],
      [1, { participantNrs: [5, 6, 7, 8] }]
    ]);
  });

  it('should compute the correct column configuration', () => {
    page.hostComponent.scheduleRound = {
      games: [{ participantNrs: [1, 2, 3, 4] }]
    };
    page.detectChanges();

    const element: [number, ScheduleGame] = [
      1,
      { participantNrs: [5, 6, 7, 8] }
    ];

    expect(page.rootComponent.tableConfiguration.columns.length).toEqual(6);
    expect(
      page.rootComponent.tableConfiguration.columns[0].cell(element)
    ).toEqual('Table');
    expect(
      page.rootComponent.tableConfiguration.columns[1].cell(element)
    ).toEqual(2);
    expect(
      page.rootComponent.tableConfiguration.columns[2].cell(element)
    ).toEqual(5);
    expect(
      page.rootComponent.tableConfiguration.columns[3].cell(element)
    ).toEqual(6);
    expect(
      page.rootComponent.tableConfiguration.columns[4].cell(element)
    ).toEqual(7);
    expect(
      page.rootComponent.tableConfiguration.columns[5].cell(element)
    ).toEqual(8);
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
  public scheduleRound: ScheduleRound;
}
