import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScheduleRound } from 'src/app/graphql/generated/types';
import { PageBase } from 'src/app/instrumentation/test/page-base';

import { ScheduleGeneratorRoundTableComponent } from '../schedule-generator-round-table/schedule-generator-round-table.component';

import { ScheduleGeneratorRoundComponent } from './schedule-generator-round.component';

describe('ScheduleGeneratorRoundComponent integration', () => {
  let page: Page;

  describe('with AgariScheduleGeneratorRoundTable', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [
          TestHostComponent,
          ScheduleGeneratorRoundComponent,
          ScheduleGeneratorRoundTableComponent
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    });

    beforeEach(() => {
      page = new Page(TestBed.createComponent(TestHostComponent));
    });

    it('should pass the schedule round', () => {
      page.host.scheduleRound = { games: [] };
      page.detectChanges();

      expect(page.scheduleGeneratorRoundTable.scheduleRound).toEqual({
        games: []
      });
    });
  });
});

class Page extends PageBase<TestHostComponent> {
  public get root(): ScheduleGeneratorRoundComponent {
    return this.component(ScheduleGeneratorRoundComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get matCardTitle(): HTMLElement {
    return this.query<HTMLElement>('mat-card-title');
  }

  public get scheduleGeneratorRoundTable(): ScheduleGeneratorRoundTableComponent {
    return this.component(ScheduleGeneratorRoundTableComponent);
  }
}

@Component({
  template: `
    <agari-schedule-generator-round
      [roundNumber]="roundNumber"
      [scheduleRound]="scheduleRound"
    ></agari-schedule-generator-round>
  `
})
class TestHostComponent {
  public roundNumber: number;
  public scheduleRound: ScheduleRound;
}
