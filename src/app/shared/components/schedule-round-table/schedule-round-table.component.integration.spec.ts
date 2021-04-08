import { Component, Directive, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScheduleRound } from 'src/app/graphql/generated/types';
import { PageBase } from 'src/app/instrumentation/test/page-base';
import { AgariTableComponent } from 'src/app/shared/table/agari-table.component';

import { ScheduleRoundTableComponent } from './schedule-round-table.component';

describe('ScheduleGeneratorRoundTableComponent integration', () => {
  let page: Page;

  describe('with AgariTable', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [
          TestHostComponent,
          ScheduleRoundTableComponent,
          AgariTableComponent,
          MatHeaderRowDefStubDirective,
          MatRowDefStubDirective
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    });

    beforeEach(() => {
      page = new Page(TestBed.createComponent(TestHostComponent));
    });

    it('should compute the correct table configuration', () => {
      page.host.scheduleRound = {
        games: [{ participantNrs: [1, 2, 3, 4] }, { participantNrs: [5, 6, 7, 8] }]
      };
      page.detectChanges();

      expect(page.agariTable.tableConfiguration.dataSource.data.length).toEqual(2);
    });

    it('should compute the correct column configuration', () => {
      page.host.scheduleRound = {
        games: [{ participantNrs: [1, 2, 3, 4] }]
      };
      page.detectChanges();

      expect(page.agariTable.tableConfiguration.columns.length).toEqual(6);
    });
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): ScheduleRoundTableComponent {
    return this.component(ScheduleRoundTableComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get agariTable(): AgariTableComponent {
    return this.component(AgariTableComponent);
  }
}

@Component({
  template: `
    <agari-schedule-round-table [scheduleRound]="scheduleRound"></agari-schedule-round-table>
  `
})
class TestHostComponent {
  public scheduleRound: ScheduleRound;
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[matHeaderRowDef]',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['columns: matHeaderRowDef']
})
class MatHeaderRowDefStubDirective {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[matRowDef]',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['columns: matRowDefColumns']
})
class MatRowDefStubDirective {}
