import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageBase } from 'src/app/instrumentation/test/page-base';
import { RoundRobinRound } from 'src/app/instrumentation/types/schedule/round-robin-round.type';

import { ScheduleRoundTableComponent } from '../schedule-round-table/schedule-round-table.component';

import { ScheduleRoundComponent } from './schedule-round.component';

describe('ScheduleGeneratorRoundComponent integration', () => {
  let page: Page;

  describe('with AgariScheduleGeneratorRoundTable', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [TestHostComponent, ScheduleRoundComponent, ScheduleRoundTableComponent],
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
  public get root(): ScheduleRoundComponent {
    return this.component(ScheduleRoundComponent);
  }

  public get host(): TestHostComponent {
    return this.component();
  }

  public get matCardTitle(): HTMLElement {
    return this.query<HTMLElement>('mat-card-title');
  }

  public get scheduleGeneratorRoundTable(): ScheduleRoundTableComponent {
    return this.component(ScheduleRoundTableComponent);
  }
}

@Component({
  template: `
    <agari-schedule-round [roundNumber]="roundNumber" [scheduleRound]="scheduleRound"></agari-schedule-round>
  `
})
class TestHostComponent {
  public roundNumber: number;
  public scheduleRound: RoundRobinRound;
}
