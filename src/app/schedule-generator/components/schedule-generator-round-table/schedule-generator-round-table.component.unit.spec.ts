import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScheduleGame, ScheduleRound } from 'src/app/graphql/generated/types';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ScheduleGeneratorRoundTableComponent } from './schedule-generator-round-table.component';

describe('ScheduleGeneratorRoundTableComponent', () => {
  let page: Page;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ScheduleGeneratorRoundTableComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    page = new Page(TestBed.createComponent(TestHostComponent));
  });

  it('should create', () => {
    page.host.scheduleRound = {
      games: []
    };
    page.detectChanges();

    expect(page.root).toBeTruthy();
  });

  it('should contain a table', () => {
    page.host.scheduleRound = {
      games: []
    };
    page.detectChanges();

    expect(page.agariTable).toBeTruthy();
  });

  it('should compute the correct table configuration', () => {
    page.host.scheduleRound = {
      games: [
        { participantNrs: [1, 2, 3, 4] },
        { participantNrs: [5, 6, 7, 8] }
      ]
    };
    page.detectChanges();

    expect(page.root.tableConfiguration.headers).toEqual(false);
    expect(page.root.tableConfiguration.dataSource.data).toEqual([
      [0, { participantNrs: [1, 2, 3, 4] }],
      [1, { participantNrs: [5, 6, 7, 8] }]
    ]);
  });

  it('should compute the correct column configuration', () => {
    page.host.scheduleRound = {
      games: [{ participantNrs: [1, 2, 3, 4] }]
    };
    page.detectChanges();

    const element: [number, ScheduleGame] = [
      1,
      { participantNrs: [5, 6, 7, 8] }
    ];

    expect(page.root.tableConfiguration.columns.length).toEqual(6);
    expect(page.root.tableConfiguration.columns[0].cell(element)).toEqual(
      'Table'
    );
    expect(page.root.tableConfiguration.columns[1].cell(element)).toEqual(2);
    expect(page.root.tableConfiguration.columns[2].cell(element)).toEqual(5);
    expect(page.root.tableConfiguration.columns[3].cell(element)).toEqual(6);
    expect(page.root.tableConfiguration.columns[4].cell(element)).toEqual(7);
    expect(page.root.tableConfiguration.columns[5].cell(element)).toEqual(8);
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): ScheduleGeneratorRoundTableComponent {
    return this.component(ScheduleGeneratorRoundTableComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get agariTable(): HTMLElement {
    return this.query<HTMLElement>('agari-table');
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
